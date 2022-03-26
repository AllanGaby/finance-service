import { CreateEntityUseCase, CustomFilterConditional, CustomFilterOperator } from '@/domain/common'
import { AccountModel, CreateAccountDTO, RepositoryAccountFilter } from '@/domain/authentication'
import { EntityAlreadyExistsError } from '@/data/common/errors'
import { CreateEntityRepository, GetOneEntityRepository } from '@/protocols/repositories'
import { CreateHashProtocol } from '@/protocols/cryptography'

export class DbCreateAccountUseCase implements CreateEntityUseCase<AccountModel, CreateAccountDTO> {
  constructor (
    private readonly createAccountRepository: CreateEntityRepository<AccountModel>,
    private readonly getAccountRepository: GetOneEntityRepository<AccountModel>,
    private readonly createHashAdapter: CreateHashProtocol
  ) {}

  async create (params: CreateAccountDTO): Promise<AccountModel> {
    const accountByEmail = await this.getAccountRepository.getOne([{
      field: RepositoryAccountFilter.Email,
      conditional: CustomFilterConditional.equal,
      operator: CustomFilterOperator.and,
      value: params.email
    }])
    if (accountByEmail) {
      throw new EntityAlreadyExistsError('Account')
    }
    const passwordHash = await this.createHashAdapter.createHash(params.password)
    const accountHash = await this.createHashAdapter.createHash(JSON.stringify({
      name: params.name,
      email: params.email,
      identification: params.identification,
      password: passwordHash
    }))
    return this.createAccountRepository.create({
      name: params.name,
      email: params.email,
      identification: params.identification,
      password: passwordHash,
      account_hash: accountHash
    })
  }
}
