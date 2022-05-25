import { DbCreateAccessSessionByProviderUseCase } from './db-create-access-session-by-provider.use-case'
import {
  CreateEntityUseCaseSpy,
  CustomFilterConditional,
  CustomFilterOperator,
  mockSettingsModel,
  SettingsModel
} from '@/domain/common'
import {
  AccessSessionPayloadModel,
  AccountModel,
  AccountProviderModel,
  CreateAccessSessionByProviderDTO,
  CreateAccessSessionDTO,
  mockAccessSessionPayloadModel,
  mockAccountModel,
  mockAccountProviderModel,
  mockCreateAccessSessionByProviderDTO,
  RepositoryAccountFilter
} from '@/domain/authentication'
import { CreateHashProtocolSpy } from '@/protocols/cryptography'
import { CreateEntityRepositorySpy, GetOneEntityRepositorySpy } from '@/protocols/repositories'
import { datatype } from 'faker'

type sutTypes = {
  sut: DbCreateAccessSessionByProviderUseCase
  settings: SettingsModel
  account: AccountModel
  createAccessSessionByProviderDTO: CreateAccessSessionByProviderDTO
  createAccountRepository: CreateEntityRepositorySpy<AccountModel>
  getAccountRepository: GetOneEntityRepositorySpy<AccountModel>
  createHashAdapter: CreateHashProtocolSpy
  createAccountProviderRepository: CreateEntityRepositorySpy<AccountProviderModel>
  createAccessSessionUseCase: CreateEntityUseCaseSpy<AccessSessionPayloadModel, CreateAccessSessionDTO>
}

const makeSut = (): sutTypes => {
  const account = mockAccountModel()
  const createAccountRepository = new CreateEntityRepositorySpy<AccountModel>()
  jest.spyOn(createAccountRepository, 'create').mockResolvedValue(account)
  account.providers = [
    mockAccountProviderModel(),
    mockAccountProviderModel()
  ]
  const getAccountRepository = new GetOneEntityRepositorySpy<AccountModel>()
  jest.spyOn(getAccountRepository, 'getOne').mockResolvedValue(account)
  const createHashAdapter = new CreateHashProtocolSpy()
  const createAccountProviderRepository = new CreateEntityRepositorySpy<AccountProviderModel>()
  const createAccessSessionUseCase = new CreateEntityUseCaseSpy<AccessSessionPayloadModel, CreateAccessSessionDTO>()
  const sut = new DbCreateAccessSessionByProviderUseCase(
    createAccountRepository,
    getAccountRepository,
    createHashAdapter,
    createAccountProviderRepository,
    createAccessSessionUseCase
  )
  return {
    sut,
    createAccessSessionByProviderDTO: mockCreateAccessSessionByProviderDTO(),
    settings: mockSettingsModel(),
    account,
    createAccountRepository,
    getAccountRepository,
    createHashAdapter,
    createAccountProviderRepository,
    createAccessSessionUseCase
  }
}

describe('DbCreateAccessSessionByProviderUseCase', () => {
  describe('Search Account By Email', () => {
    test('Should call getAccountRepository with correct values', async () => {
      const { sut, createAccessSessionByProviderDTO, getAccountRepository } = makeSut()
      const getOnSpy = jest.spyOn(getAccountRepository, 'getOne')
      await sut.create(createAccessSessionByProviderDTO)
      expect(getOnSpy).toHaveBeenCalledWith([{
        field: RepositoryAccountFilter.Email,
        conditional: CustomFilterConditional.equal,
        operator: CustomFilterOperator.and,
        value: createAccessSessionByProviderDTO.email
      }])
    })

    test('Should not call createAccountRepository if getAccountRepository return any value', async () => {
      const { sut, createAccessSessionByProviderDTO, createAccountRepository } = makeSut()
      const createSpy = jest.spyOn(createAccountRepository, 'create')
      await sut.create(createAccessSessionByProviderDTO)
      expect(createSpy).not.toHaveBeenCalled()
    })
  })

  describe('Create a new Account', () => {
    test('Should call createHashAdapter with correct values', async () => {
      const { sut, createAccessSessionByProviderDTO, getAccountRepository, createHashAdapter } = makeSut()
      const createHashSpy = jest.spyOn(createHashAdapter, 'createHash')
      jest.spyOn(getAccountRepository, 'getOne').mockResolvedValue(undefined)
      await sut.create(createAccessSessionByProviderDTO)
      expect(createHashSpy).toHaveBeenCalledWith(JSON.stringify({
        name: createAccessSessionByProviderDTO.name,
        email: createAccessSessionByProviderDTO.email,
        identification: undefined,
        password: undefined
      }))
    })

    test('Should call createAccountRepository with correct values', async () => {
      const { sut, createAccessSessionByProviderDTO, getAccountRepository, createHashAdapter, createAccountRepository } = makeSut()
      const accountHash = datatype.uuid()
      jest.spyOn(createHashAdapter, 'createHash').mockResolvedValue(accountHash)
      const createSpy = jest.spyOn(createAccountRepository, 'create')
      jest.spyOn(getAccountRepository, 'getOne').mockResolvedValue(undefined)
      await sut.create(createAccessSessionByProviderDTO)
      expect(createSpy).toHaveBeenCalledWith({
        name: createAccessSessionByProviderDTO.name,
        email: createAccessSessionByProviderDTO.email,
        identification: undefined,
        password: undefined,
        account_hash: accountHash
      })
    })
  })

  describe('Create AccountProvider', () => {
    test('Should call createAccountProviderRepository with correct values if Account hasnt provider', async () => {
      const { sut, createAccessSessionByProviderDTO, account, createAccountProviderRepository } = makeSut()
      account.providers = []
      const createSpy = jest.spyOn(createAccountProviderRepository, 'create')
      await sut.create(createAccessSessionByProviderDTO)
      expect(createSpy).toHaveBeenCalledWith({
        account_id: account.id,
        account_provider_id: createAccessSessionByProviderDTO.account_provider_id,
        provider: createAccessSessionByProviderDTO.provider
      })
    })

    test('Should not call createAccountProviderRepository if Account has provider', async () => {
      const { sut, createAccessSessionByProviderDTO, account, createAccountProviderRepository } = makeSut()
      account.providers[0].provider = createAccessSessionByProviderDTO.provider
      const createSpy = jest.spyOn(createAccountProviderRepository, 'create')
      await sut.create(createAccessSessionByProviderDTO)
      expect(createSpy).not.toHaveBeenCalled()
    })
  })

  describe('Create a new AccessSession', () => {
    test('Should call CreateAccessSessionUseCase with correct values', async () => {
      const { sut, createAccessSessionByProviderDTO, account, settings, createAccessSessionUseCase } = makeSut()
      const createSpy = jest.spyOn(createAccessSessionUseCase, 'create')
      await sut.create(createAccessSessionByProviderDTO, settings)
      expect(createSpy).toHaveBeenCalledWith({
        ...account,
        ip: createAccessSessionByProviderDTO.ip
      }, settings)
    })

    test('Should return a new AccessSession', async () => {
      const { sut, createAccessSessionByProviderDTO, settings, createAccessSessionUseCase } = makeSut()
      const accessSession = mockAccessSessionPayloadModel()
      jest.spyOn(createAccessSessionUseCase, 'create').mockResolvedValue(accessSession)
      const response = await sut.create(createAccessSessionByProviderDTO, settings)
      expect(response).toEqual(accessSession)
    })
  })
})
