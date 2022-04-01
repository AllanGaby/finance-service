import { DbCreateRequestRecoverPasswordUseCase } from './db-create-request-recover-password.use-case'
import {
  AccountModel,
  RequestRecoverPasswordModel,
  CreateRequestRecoverPasswordDTO,
  mockCreateRequestRecoverPasswordDTO,
  RepositoryAccountFilter,
  mockAccountModel
} from '@/domain/authentication'
import { SendMailUseCaseSpy } from '@/domain/comunication'
import { CustomFilterConditional, CustomFilterOperator, mockSettingsModel, SettingsModel } from '@/domain/common'
import { CreateEntityRepositorySpy, GetOneEntityRepositorySpy, SoftDeleteEntityRepositorySpy } from '@/protocols/repositories'
import { CreateTwoFactorAuthenticationSecretProtocolSpy, CreateTwoFactorAuthenticationTokenProtocolSpy } from '@/protocols/two-factor-authentication'
import { InvalidCredentialsError } from '@/data/authentication/errors'
import { datatype, system } from 'faker'

type sutTypes = {
  sut: DbCreateRequestRecoverPasswordUseCase
  createRequestRecoverPasswordDTO: CreateRequestRecoverPasswordDTO
  settings: SettingsModel
  account: AccountModel
  getAccountRepository: GetOneEntityRepositorySpy<AccountModel>
  createTwoFactorAuthenticationSecretAdapter: CreateTwoFactorAuthenticationSecretProtocolSpy
  createTwoFactorAuthenticationTokenAdapter: CreateTwoFactorAuthenticationTokenProtocolSpy
  deleteRequestRecoverPasswordRepository: SoftDeleteEntityRepositorySpy<RequestRecoverPasswordModel>
  createRequestRecoverPasswordRepository: CreateEntityRepositorySpy<RequestRecoverPasswordModel>
  sendMailUseCase: SendMailUseCaseSpy
  recoverPasswordEmailFilePath: string
}

const makeSut = (): sutTypes => {
  const account = mockAccountModel()
  const getAccountRepository = new GetOneEntityRepositorySpy<AccountModel>()
  jest.spyOn(getAccountRepository, 'getOne').mockResolvedValue(account)
  const createTwoFactorAuthenticationSecretAdapter = new CreateTwoFactorAuthenticationSecretProtocolSpy()
  const createTwoFactorAuthenticationTokenAdapter = new CreateTwoFactorAuthenticationTokenProtocolSpy()
  const deleteRequestRecoverPasswordRepository = new SoftDeleteEntityRepositorySpy<RequestRecoverPasswordModel>()
  const createRequestRecoverPasswordRepository = new CreateEntityRepositorySpy<RequestRecoverPasswordModel>()
  const sendMailUseCase = new SendMailUseCaseSpy()
  const recoverPasswordEmailFilePath = system.filePath()
  const sut = new DbCreateRequestRecoverPasswordUseCase(
    getAccountRepository,
    createTwoFactorAuthenticationSecretAdapter,
    createTwoFactorAuthenticationTokenAdapter,
    deleteRequestRecoverPasswordRepository,
    createRequestRecoverPasswordRepository,
    sendMailUseCase,
    recoverPasswordEmailFilePath
  )
  return {
    sut,
    createRequestRecoverPasswordDTO: mockCreateRequestRecoverPasswordDTO(),
    settings: mockSettingsModel(),
    account,
    getAccountRepository,
    createTwoFactorAuthenticationSecretAdapter,
    createTwoFactorAuthenticationTokenAdapter,
    deleteRequestRecoverPasswordRepository,
    createRequestRecoverPasswordRepository,
    sendMailUseCase,
    recoverPasswordEmailFilePath
  }
}

describe('DbCreateRequestRecoverPasswordUseCase', () => {
  describe('Search Account By E-mail', () => {
    test('Should call getAccountRepository with correct values', async () => {
      const { sut, createRequestRecoverPasswordDTO, settings, getAccountRepository } = makeSut()
      const getOneSpy = jest.spyOn(getAccountRepository, 'getOne')
      await sut.create(createRequestRecoverPasswordDTO, settings)
      expect(getOneSpy).toHaveBeenCalledWith([{
        field: RepositoryAccountFilter.Email,
        conditional: CustomFilterConditional.equal,
        operator: CustomFilterOperator.and,
        value: createRequestRecoverPasswordDTO.email
      }])
    })

    test('Should return InvalidCredentialsError if getAccountRepository return undefined', async () => {
      const { sut, createRequestRecoverPasswordDTO, settings, getAccountRepository } = makeSut()
      jest.spyOn(getAccountRepository, 'getOne').mockResolvedValue(undefined)
      const promise = sut.create(createRequestRecoverPasswordDTO, settings)
      await expect(promise).rejects.toThrowError(InvalidCredentialsError)
    })
  })

  describe('Create TwoAuthenticationSecret', () => {
    test('Should call createTwoFactorAuthenticationSecretAdapter with correct values', async () => {
      const { sut, createRequestRecoverPasswordDTO, settings, account, createTwoFactorAuthenticationSecretAdapter } = makeSut()
      const createSecretSpy = jest.spyOn(createTwoFactorAuthenticationSecretAdapter, 'createSecret')
      await sut.create(createRequestRecoverPasswordDTO, settings)
      expect(createSecretSpy).toHaveBeenCalledWith({
        accountId: account.id,
        name: account.name
      })
    })
  })

  describe('Create TwoAuthenticationToken', () => {
    test('Should call createTwoFactorAuthenticationTokenAdapter with correct values', async () => {
      const { sut, createRequestRecoverPasswordDTO, settings, createTwoFactorAuthenticationSecretAdapter, createTwoFactorAuthenticationTokenAdapter } = makeSut()
      const secret = datatype.uuid()
      jest.spyOn(createTwoFactorAuthenticationSecretAdapter, 'createSecret').mockReturnValue(secret)
      const createTokenSpy = jest.spyOn(createTwoFactorAuthenticationTokenAdapter, 'createToken')
      await sut.create(createRequestRecoverPasswordDTO, settings)
      expect(createTokenSpy).toHaveBeenCalledWith(secret)
    })
  })

  describe('Delete old requests', () => {
    test('Should call deleteRequestRecoverPasswordRepository with correct values', async () => {
      const { sut, createRequestRecoverPasswordDTO, settings, account, deleteRequestRecoverPasswordRepository } = makeSut()
      const softDeleteSpy = jest.spyOn(deleteRequestRecoverPasswordRepository, 'softDelete')
      await sut.create(createRequestRecoverPasswordDTO, settings)
      expect(softDeleteSpy).toHaveBeenCalledWith({
        account_id: account.id
      })
    })
  })

  describe('Create RequestRecoverPassword', () => {
    test('Should call createRequestRecoverPasswordRepository with correct values', async () => {
      const { sut, createRequestRecoverPasswordDTO, settings, account, createTwoFactorAuthenticationSecretAdapter, createTwoFactorAuthenticationTokenAdapter, createRequestRecoverPasswordRepository } = makeSut()
      const secret = datatype.uuid()
      const token = datatype.uuid()
      jest.spyOn(createTwoFactorAuthenticationSecretAdapter, 'createSecret').mockReturnValue(secret)
      jest.spyOn(createTwoFactorAuthenticationTokenAdapter, 'createToken').mockReturnValue(token)
      const createSpy = jest.spyOn(createRequestRecoverPasswordRepository, 'create')
      await sut.create(createRequestRecoverPasswordDTO, settings)
      expect(createSpy).toHaveBeenCalledWith({
        account_id: account.id,
        authentication_secret: secret,
        validation_code: token
      })
    })
  })

  describe('Send Mail to User', () => {
    test('Should call sendMailUseCase with correct values', async () => {
      const { sut, createRequestRecoverPasswordDTO, settings, account, createTwoFactorAuthenticationTokenAdapter, recoverPasswordEmailFilePath, sendMailUseCase } = makeSut()
      const token = datatype.uuid()
      jest.spyOn(createTwoFactorAuthenticationTokenAdapter, 'createToken').mockReturnValue(token)
      const sendMailSpy = jest.spyOn(sendMailUseCase, 'sendMail')
      await sut.create(createRequestRecoverPasswordDTO, settings)
      expect(sendMailSpy).toHaveBeenCalledWith({
        mailFilePath: recoverPasswordEmailFilePath,
        sendMailTo: {
          name: account.name,
          email: account.email
        },
        subject: '[Authentication] - Request Recover Password',
        variables: {
          validation_code: token,
          name: account.name
        }
      }, settings)
    })
  })
})
