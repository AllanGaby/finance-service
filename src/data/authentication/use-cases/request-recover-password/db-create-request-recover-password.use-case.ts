import { CreateEntityUseCase, CustomFilterConditional, CustomFilterOperator, SettingsModel } from '@/domain/common'
import { RequestRecoverPasswordModel, CreateRequestRecoverPasswordDTO, AccountModel, RepositoryAccountFilter } from '@/domain/authentication'
import { InvalidCredentialsError } from '@/data/authentication/errors'
import { CreateTwoFactorAuthenticationSecretProtocol, CreateTwoFactorAuthenticationTokenProtocol } from '@/protocols/two-factor-authentication'
import { CreateEntityRepository, GetOneEntityRepository, SoftDeleteEntityRepository } from '@/protocols/repositories'
import { SendMailUseCase } from '@/domain/comunication'

export class DbCreateRequestRecoverPasswordUseCase
implements CreateEntityUseCase<RequestRecoverPasswordModel, CreateRequestRecoverPasswordDTO> {
  constructor (
    private readonly getAccountRepository: GetOneEntityRepository<AccountModel>,
    private readonly createTwoFactorAuthenticationSecretAdapter: CreateTwoFactorAuthenticationSecretProtocol,
    private readonly createTwoFactorAuthenticationTokenAdapter: CreateTwoFactorAuthenticationTokenProtocol,
    private readonly deleteRequestRecoverPasswordRepository: SoftDeleteEntityRepository<RequestRecoverPasswordModel>,
    private readonly createRequestRecoverPasswordRepository: CreateEntityRepository<RequestRecoverPasswordModel>,
    private readonly sendMailUseCase: SendMailUseCase,
    private readonly recoverPasswordEmailFilePath: string
  ) {}

  async create ({ email }: CreateRequestRecoverPasswordDTO, settings: SettingsModel): Promise<RequestRecoverPasswordModel | undefined> {
    const accountByEmail = await this.getAccountRepository.getOne([{
      field: RepositoryAccountFilter.Email,
      conditional: CustomFilterConditional.equal,
      operator: CustomFilterOperator.and,
      value: email
    }])
    if (!accountByEmail) {
      throw new InvalidCredentialsError()
    }
    const authenticationSecret = this.createTwoFactorAuthenticationSecretAdapter.createSecret({
      accountId: accountByEmail.id,
      name: accountByEmail.name
    })
    const validationCode = this.createTwoFactorAuthenticationTokenAdapter.createToken(authenticationSecret)
    await this.deleteRequestRecoverPasswordRepository.softDelete({
      account_id: accountByEmail.id
    })
    await this.createRequestRecoverPasswordRepository.create({
      account_id: accountByEmail.id,
      authentication_secret: authenticationSecret,
      validation_code: validationCode
    })
    await this.sendMailUseCase.sendMail({
      mailFilePath: this.recoverPasswordEmailFilePath,
      sendMailTo: {
        name: accountByEmail.name,
        email: accountByEmail.email
      },
      subject: '[Authentication] - Request Recover Password',
      variables: {
        validation_code: validationCode,
        name: accountByEmail.name
      }
    }, settings)
    return undefined
  }
}
