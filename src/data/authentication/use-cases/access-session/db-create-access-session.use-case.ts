import { CreateEntityUseCase } from '@/domain/common'
import {
  AccessSessionModel,
  AccessSessionModuleModel,
  AccessSessionPayloadModel,
  AccountModel,
  CreateAccessSessionDTO
} from '@/domain/authentication'
import { CreateEntityRepository } from '@/protocols/repositories'
import { EncryptRequestWithPublicKeyProtocol } from '@/protocols/rsa'
import { CreateCacheProtocol } from '@/protocols/cache'
import { CreateJsonWebTokenProtocol } from '@/protocols/jwt'

export class DbCreateAccessSessionUseCase implements CreateEntityUseCase<AccessSessionPayloadModel, AccountModel> {
  constructor (
    private readonly createAccessSessionRepository: CreateEntityRepository<AccessSessionModel>,
    private readonly createCacheAdapter: CreateCacheProtocol,
    private readonly encryptWithPublicKeyAdapter: EncryptRequestWithPublicKeyProtocol,
    private readonly createJWTAdapter: CreateJsonWebTokenProtocol
  ) {}

  async create ({ ip, ...account }: CreateAccessSessionDTO): Promise<AccessSessionPayloadModel> {
    const modules: AccessSessionModuleModel = {}
    account.modules.forEach(module => {
      const accessProfile = module.access_profile
      const moduleAcessRuleKeys = accessProfile.module_access_rules.map<string>(moduleAccessRule => moduleAccessRule.rule_key)
      modules[accessProfile.module.module_key] = {
        access_profile_key: accessProfile.access_profile_key,
        access_profile_rules: moduleAcessRuleKeys
      }
    })
    const accessSession = await this.createAccessSessionRepository.create({
      account_id: account.id,
      access_session_modules: JSON.stringify(modules),
      ip
    })
    await this.createCacheAdapter.create<Partial<AccessSessionPayloadModel>>({
      key: `session:${account.id}:${accessSession.id}`,
      record: {
        session_id: accessSession.id,
        account_id: account.id,
        account_name: account.name,
        modules: modules
      }
    })
    const accessSessionToken = this.encryptWithPublicKeyAdapter.createToken(JSON.stringify({
      session_id: accessSession.id,
      account_id: account.id,
      ip
    }))
    const accessToken = await this.createJWTAdapter.createJWT({
      payload: {
        access_token: accessSessionToken
      },
      subject: account.id
    }, '24h')
    const refreshToken = await this.createJWTAdapter.createJWT({
      payload: {
        access_token: accessSessionToken
      },
      subject: account.id
    }, '168h')
    return {
      session_id: accessSession.id,
      account_id: account.id,
      account_name: account.name,
      modules: modules,
      access_token: accessToken,
      refresh_token: refreshToken
    }
  }
}
