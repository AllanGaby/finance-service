import { UpdateEntityByIdUseCase } from '@/domain/common'
import { AccountModel, UpdateAccountDTO } from '@/domain/authentication'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/protocols/repositories'
import { CreateHashProtocol } from '@/protocols/cryptography'
import { EntityIsNotFoundError } from '@/data/common/errors'

export class DbUpdateaccountByIdUseCase implements UpdateEntityByIdUseCase<AccountModel, UpdateAccountDTO> {
  constructor (
    private readonly getAccountByIdRepository: GetEntityByIdRepository<AccountModel>,
    private readonly createHashAdapter: CreateHashProtocol,
    private readonly updateAccountRepository: UpdateEntityRepository<AccountModel>
  ) {}

  async updateById (entityId: string, { name }: UpdateAccountDTO): Promise<AccountModel> {
    const account = await this.getAccountByIdRepository.getById(entityId)
    if (!account) {
      throw new EntityIsNotFoundError('Account')
    }
    const accountHash = await this.createHashAdapter.createHash(JSON.stringify({
      name,
      email: account.email,
      identification: account.identification,
      password: account.password
    }))
    return this.updateAccountRepository.update({
      id: account.id,
      name,
      account_hash: accountHash
    })
  }
}
