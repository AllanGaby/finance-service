import { CreateAccessSessionByProviderDTO, AccountModel, AccountProviderModel, RepositoryAccountFilter, AccessSessionPayloadModel, CreateAccessSessionDTO } from '@/domain/authentication'
import { CreateEntityUseCase, CustomFilterConditional, CustomFilterOperator, SettingsModel } from '@/domain/common'
import { CreateHashProtocol } from '@/protocols/cryptography'
import { CreateEntityRepository, GetOneEntityRepository } from '@/protocols/repositories'

export class DbCreateAccessSessionByProviderUseCase implements CreateEntityUseCase<AccessSessionPayloadModel, CreateAccessSessionByProviderDTO> {
  constructor (
    private readonly createAccountRepository: CreateEntityRepository<AccountModel>,
    private readonly getAccountRepository: GetOneEntityRepository<AccountModel>,
    private readonly createHashAdapter: CreateHashProtocol,
    private readonly createAccountProviderRepository: CreateEntityRepository<AccountProviderModel>,
    private readonly createAccessSessionUseCase: CreateEntityUseCase<AccessSessionPayloadModel, CreateAccessSessionDTO>
  ) {}

  async create (params: CreateAccessSessionByProviderDTO, settings?: SettingsModel): Promise<AccessSessionPayloadModel> {
    let account = await this.getAccountRepository.getOne([{
      field: RepositoryAccountFilter.Email,
      conditional: CustomFilterConditional.equal,
      operator: CustomFilterOperator.and,
      value: params.email
    }])
    if (!account) {
      const accountHash = await this.createHashAdapter.createHash(JSON.stringify({
        name: params.name,
        email: params.email,
        identification: undefined,
        password: undefined
      }))
      account = await this.createAccountRepository.create({
        name: params.name,
        email: params.email,
        identification: undefined,
        password: undefined,
        account_hash: accountHash
      })
      account.providers = []
    }
    const accountHasProvider = account.providers.find(item => item.provider === params.provider)
    if (!accountHasProvider) {
      const newProvider = await this.createAccountProviderRepository.create({
        account_id: account.id,
        account_provider_id: params.account_provider_id,
        provider: params.provider
      })
      account.providers.push(newProvider)
    }
    const accessSession = await this.createAccessSessionUseCase.create({ ...account, ip: params.ip }, settings) as AccessSessionPayloadModel
    return accessSession
  }
}
