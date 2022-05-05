import { CreateEntityUseCase, CustomFilterConditional, CustomFilterOperator, SettingsModel } from '@/domain/common'
import {
  LoginDTO,
  LoginUseCase,
  AccessSessionPayloadModel,
  AccountModel,
  CreateAccessSessionDTO,
  RepositoryAccountFilter
} from '@/domain/authentication'
import { CorruptedAccountError, InvalidCredentialsError } from '@/data/authentication/errors'
import { GetOneEntityRepository } from '@/protocols/repositories'
import { CompareHashProtocol } from '@/protocols/cryptography'

export class DbLoginUseCase implements LoginUseCase {
  constructor (
    private readonly getAccountRepository: GetOneEntityRepository<AccountModel>,
    private readonly compareHashAdapter: CompareHashProtocol,
    private readonly createAccessSessionUseCase: CreateEntityUseCase<AccessSessionPayloadModel, CreateAccessSessionDTO>
  ) {}

  async login ({ login, password, ip }: LoginDTO, settings: SettingsModel): Promise<AccessSessionPayloadModel> {
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
    const accessSession = await this.createAccessSessionUseCase.create({ ...accountByLogin, ip }, settings) as AccessSessionPayloadModel
    return accessSession
  }
}
