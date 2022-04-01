import { CustomFilterConditional, CustomFilterOperator, UpdateEntityUseCase } from '@/domain/common'
import { RequestRecoverPasswordModel, RecoverPasswordDTO, RepositoryRequestRecoverPasswordFilter, AccountModel } from '@/domain/authentication'
import { GetOneEntityRepository, SoftDeleteEntityByIdRepository, UpdateEntityRepository } from '@/protocols/repositories'
import { CompareHashProtocol, CreateHashProtocol } from '@/protocols/cryptography'
import { InvalidCredentialsError, CorruptedAccountError } from '@/data/authentication/errors'

export class DbRecoverPasswordUseCase implements UpdateEntityUseCase<RequestRecoverPasswordModel, RecoverPasswordDTO> {
  constructor (
    private readonly getRequestRecoverPasswordRepository: GetOneEntityRepository<RequestRecoverPasswordModel>,
    private readonly compareHashAdapter: CompareHashProtocol,
    private readonly createHashAdapter: CreateHashProtocol,
    private readonly updateAccountRepository: UpdateEntityRepository<AccountModel>,
    private readonly deleteRequestRecoverPasswordRepository: SoftDeleteEntityByIdRepository<RequestRecoverPasswordModel>
  ) {}

  async update ({ verification_code: validationCode, password }: RecoverPasswordDTO): Promise<RequestRecoverPasswordModel> {
    const requestRecoverPassword = await this.getRequestRecoverPasswordRepository.getOne([{
      conditional: CustomFilterConditional.equal,
      field: RepositoryRequestRecoverPasswordFilter.ValidationCode,
      operator: CustomFilterOperator.and,
      value: validationCode
    }])
    if (!requestRecoverPassword) {
      throw new InvalidCredentialsError()
    }
    const { account } = requestRecoverPassword
    const isEqualAccountHash = await this.compareHashAdapter.compareHash(JSON.stringify({
      name: account.name,
      email: account.email,
      identification: account.identification,
      password: account.password
    }), account.account_hash)
    if (!isEqualAccountHash) {
      throw new CorruptedAccountError()
    }
    const passwordHash = await this.createHashAdapter.createHash(password)
    const accountHash = await this.createHashAdapter.createHash(JSON.stringify({
      name: account.name,
      email: account.email,
      identification: account.identification,
      password: passwordHash
    }))
    await this.updateAccountRepository.update({
      id: account.id,
      password: passwordHash,
      account_hash: accountHash
    })
    await this.deleteRequestRecoverPasswordRepository.softDeleteById(requestRecoverPassword.id)
    return undefined
  }
}
