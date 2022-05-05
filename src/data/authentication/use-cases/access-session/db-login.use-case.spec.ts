import { DbLoginUseCase } from './db-login.use-case'
import { AccessSessionPayloadModel, AccountModel, CreateAccessSessionDTO, LoginDTO, mockAccessSessionPayloadModel, mockAccountModel, mockLoginDTO, RepositoryAccountFilter } from '@/domain/authentication'
import { CreateEntityUseCaseSpy, CustomFilterConditional, CustomFilterOperator, mockSettingsModel, SettingsModel } from '@/domain/common'
import { InvalidCredentialsError, CorruptedAccountError } from '@/data/authentication/errors'
import { CompareHashProtocolSpy } from '@/protocols/cryptography'
import { GetOneEntityRepositorySpy } from '@/protocols/repositories'

type sutTypes = {
  sut: DbLoginUseCase
  loginDTO: LoginDTO
  settings: SettingsModel
  account: AccountModel
  getAccountRepository: GetOneEntityRepositorySpy<AccountModel>
  compareHashAdapter: CompareHashProtocolSpy
  createAccessSessionUseCase: CreateEntityUseCaseSpy<AccessSessionPayloadModel, CreateAccessSessionDTO>
}

const makeSut = (): sutTypes => {
  const loginDTO = mockLoginDTO()
  const account = mockAccountModel()
  const getAccountRepository = new GetOneEntityRepositorySpy<AccountModel>()
  jest.spyOn(getAccountRepository, 'getOne').mockResolvedValue(account)
  const compareHashAdapter = new CompareHashProtocolSpy()
  jest.spyOn(compareHashAdapter, 'compareHash').mockResolvedValue(true)
  const createAccessSessionUseCase = new CreateEntityUseCaseSpy<AccessSessionPayloadModel, CreateAccessSessionDTO>()
  const sut = new DbLoginUseCase(
    getAccountRepository,
    compareHashAdapter,
    createAccessSessionUseCase
  )
  return {
    sut,
    loginDTO,
    account,
    settings: mockSettingsModel(),
    getAccountRepository,
    compareHashAdapter,
    createAccessSessionUseCase
  }
}

describe('DbLoginUseCase', () => {
  describe('Search Account By Login', () => {
    test('Should call GetAccountRepository with correct values', async () => {
      const { sut, loginDTO, settings, getAccountRepository } = makeSut()
      const getOneSpy = jest.spyOn(getAccountRepository, 'getOne')
      await sut.login(loginDTO, settings)
      expect(getOneSpy).toHaveBeenCalledWith([{
        field: RepositoryAccountFilter.Email,
        conditional: CustomFilterConditional.equal,
        operator: CustomFilterOperator.or,
        value: loginDTO.login
      }, {
        field: RepositoryAccountFilter.Identification,
        conditional: CustomFilterConditional.equal,
        operator: CustomFilterOperator.or,
        value: loginDTO.login
      }])
    })

    test('Should return InvalidCredentialsError if GetAccountRepository return undefined', async () => {
      const { sut, loginDTO, settings, getAccountRepository } = makeSut()
      jest.spyOn(getAccountRepository, 'getOne').mockResolvedValue(undefined)
      const response = sut.login(loginDTO, settings)
      await expect(response).rejects.toThrowError(InvalidCredentialsError)
    })
  })

  describe('Check Account Password', () => {
    test('Should return InvalidCredentialsError if CompareHashAdapter return false', async () => {
      const { sut, loginDTO, settings, compareHashAdapter } = makeSut()
      jest.spyOn(compareHashAdapter, 'compareHash').mockResolvedValue(false)
      const response = sut.login(loginDTO, settings)
      await expect(response).rejects.toThrowError(InvalidCredentialsError)
    })
  })

  describe('Check Account Hash', () => {
    test('Should return CorruptedAccountError if CompareHashAdapter return false', async () => {
      const { sut, loginDTO, settings, compareHashAdapter } = makeSut()
      jest.spyOn(compareHashAdapter, 'compareHash')
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(false)
      const response = sut.login(loginDTO, settings)
      await expect(response).rejects.toThrowError(CorruptedAccountError)
    })
  })

  describe('Create a new AccessSession', () => {
    test('Should call CreateAccessSessionUseCase with correct value', async () => {
      const { sut, loginDTO, settings, account, createAccessSessionUseCase } = makeSut()
      const createSpy = jest.spyOn(createAccessSessionUseCase, 'create')
      await sut.login(loginDTO, settings)
      expect(createSpy).toHaveBeenCalledWith({
        ...account,
        ip: loginDTO.ip
      }, settings)
    })
  })

  describe('Return correc value', () => {
    test('Should return same CreateAccessSessionUseCase returned', async () => {
      const { sut, loginDTO, settings, createAccessSessionUseCase } = makeSut()
      const accessSession = mockAccessSessionPayloadModel()
      jest.spyOn(createAccessSessionUseCase, 'create').mockResolvedValue(accessSession)
      const response = await sut.login(loginDTO, settings)
      expect(response).toEqual(accessSession)
    })
  })
})
