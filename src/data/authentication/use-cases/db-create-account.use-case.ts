import { CustomFilterConditional, CustomFilterOperator } from '@/domain/common'
import { AccountModel, CreateAccountDTO, RepositoryAccountFilter } from '@/domain/authentication'
import { DbCreateEntityUseCase } from '@/data/common/use-cases'
import { EntityAlreadyExistsError } from '@/data/common/errors'
import { CreateEntityRepository, ListEntitiesRepository } from '@/protocols/repositories'
import { CreateHashProtocol } from '@/protocols/cryptography'

export class DbCreateAccountUseCase extends DbCreateEntityUseCase<AccountModel, CreateAccountDTO> {
  constructor (
    createAccountRepository: CreateEntityRepository<AccountModel>,
    private readonly listAccountRepository: ListEntitiesRepository<AccountModel>,
    private readonly createHashAdapter: CreateHashProtocol
  ) {
    super(createAccountRepository)
  }

  async create (params: CreateAccountDTO): Promise<AccountModel> {
    const accountByEmailList = await this.listAccountRepository.list({
      filters: [{
        field: RepositoryAccountFilter.Email,
        conditional: CustomFilterConditional.equal,
        operator: CustomFilterOperator.and,
        value: params.email
      }]
    })
    if (accountByEmailList.length > 0) {
      throw new EntityAlreadyExistsError('Account')
    }
    params.password = await this.createHashAdapter.createHash(params.password)
    params.account_hash = await this.createHashAdapter.createHash(JSON.stringify(params))
    return super.create(params)
  }
}
