import { CreateEntityUseCase, CustomFilterConditional, CustomFilterOperator } from '@/domain/common'
import {
  AccessSessionModel,
  AccessSessionModuleModel,
  AccessSessionPayloadModel,
  AccountModel,
  CreateAccessSessionDTO,
  RepositoryAccountFilter
} from '@/domain/authentication'
import { CorruptedAccountError, InvalidCredentialsError } from '@/data/authentication/errors'
import { CreateEntityRepository, GetOneEntityRepository } from '@/protocols/repositories'
import { CompareHashProtocol } from '@/protocols/cryptography'
import { EncryptRequestWithPublicKeyProtocol } from '@/protocols/rsa'
import { CreateCacheProtocol } from '@/protocols/cache'
import { CreateJsonWebTokenProtocol } from '@/protocols/jwt'

export class DbCreateAccessSessionUseCase implements CreateEntityUseCase<AccessSessionPayloadModel, CreateAccessSessionDTO> {
  constructor (
    private readonly getAccountRepository: GetOneEntityRepository<AccountModel>,
    private readonly compareHashAdapter: CompareHashProtocol,
    private readonly createAccessSessionRepository: CreateEntityRepository<AccessSessionModel>,
    private readonly createCacheAdapter: CreateCacheProtocol,
    private readonly encryptWithPublicKeyAdapter: EncryptRequestWithPublicKeyProtocol,
    private readonly createJWTAdapter: CreateJsonWebTokenProtocol
  ) {}

  async create ({ login, password }: CreateAccessSessionDTO): Promise<AccessSessionPayloadModel> {
    const accountByLogin = await this.getAccountRepository.getOne([{
      field: RepositoryAccountFilter.Email,
      conditional: CustomFilterConditional.equal,
      operator: CustomFilterOperator.or,
      value: login
    }, {
      field: RepositoryAccountFilter.Identification,
      conditional: CustomFilterConditional.equal,
      operator: CustomFilterOperator.or,
      value: login
    }])
    if (!accountByLogin) {
      throw new InvalidCredentialsError()
    }
    const isEqualPassword = await this.compareHashAdapter.compareHash(password, accountByLogin.password)
    if (!isEqualPassword) {
      throw new InvalidCredentialsError()
    }
    const isEqualAccountHash = await this.compareHashAdapter.compareHash(JSON.stringify({
      name: accountByLogin.name,
      email: accountByLogin.email,
      identification: accountByLogin.identification,
      password: accountByLogin.password
    }), accountByLogin.account_hash)
    if (!isEqualAccountHash) {
      throw new CorruptedAccountError()
    }
    const modules: AccessSessionModuleModel = {}
    accountByLogin.modules.forEach(module => {
      const accessProfile = module.access_profile
      const moduleAcessRuleKeys = accessProfile.module_access_rules.map<string>(moduleAccessRule => moduleAccessRule.rule_key)
      modules[accessProfile.module.module_key] = {
        access_profile_key: accessProfile.access_profile_key,
        access_profile_rules: moduleAcessRuleKeys
      }
    })
    const accessSession = await this.createAccessSessionRepository.create({
      account_id: accountByLogin.id,
      access_session_modules: JSON.stringify(modules)
    })
    await this.createCacheAdapter.create<Partial<AccessSessionPayloadModel>>({
      key: `session:${accountByLogin.id}:${accessSession.id}`,
      record: {
        session_id: accessSession.id,
        account_id: accountByLogin.id,
        account_name: accountByLogin.name,
        modules: modules
      }
    })
    const accessSessionToken = this.encryptWithPublicKeyAdapter.createToken(JSON.stringify({
      session_id: accessSession.id,
      account_id: accountByLogin.id
    }))
    const accessToken = await this.createJWTAdapter.createJWT({
      payload: {
        access_token: accessSessionToken
      },
      subject: accountByLogin.id
    }, '10m')
    const refreshToken = await this.createJWTAdapter.createJWT({
      payload: {
        access_token: accessSessionToken
      },
      subject: accountByLogin.id
    }, '168h')
    return {
      session_id: accessSession.id,
      account_id: accountByLogin.id,
      account_name: accountByLogin.name,
      modules: modules,
      access_token: accessToken,
      refresh_token: refreshToken
    }
  }
}
