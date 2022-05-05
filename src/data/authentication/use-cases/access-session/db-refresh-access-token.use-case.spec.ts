import { DbRefreshAccessTokenUseCase } from './db-refresh-access-token.use-case'
import { CreateEntityUseCaseSpy, mockSettingsModel, SettingsModel } from '@/domain/common'
import { AccessSessionModel, AccessSessionPayloadModel, AccountModel, CreateAccessSessionDTO, GetAccessSessionByTokenUseCaseSpy, mockAccessSessionModel, mockAccessSessionPayloadModel, mockAccountModel, mockRefreshAccessTokenDTO, RefreshAccessTokenDTO } from '@/domain/authentication'
import { InvalidateCacheByKeyProtocolSpy } from '@/protocols/cache'
import { GetEntityByIdRepositorySpy } from '@/protocols/repositories'

type sutTypes = {
  sut: DbRefreshAccessTokenUseCase
  refreshAccessTokenDTO: RefreshAccessTokenDTO
  settings: SettingsModel
  currentSession: AccessSessionModel
  account: AccountModel
  getAccessSessionByTokenUseCase: GetAccessSessionByTokenUseCaseSpy
  invalidateCacheAdapter: InvalidateCacheByKeyProtocolSpy
  getAccountByIdRepository: GetEntityByIdRepositorySpy<AccountModel>
  createAccessSessionUseCase: CreateEntityUseCaseSpy<AccessSessionPayloadModel, CreateAccessSessionDTO>
}

const makeSut = (): sutTypes => {
  const refreshAccessTokenDTO = mockRefreshAccessTokenDTO()
  const settings = mockSettingsModel()
  const currentSession = mockAccessSessionModel()
  const account = mockAccountModel()
  const getAccessSessionByTokenUseCase = new GetAccessSessionByTokenUseCaseSpy()
  jest.spyOn(getAccessSessionByTokenUseCase, 'getByToken').mockResolvedValue(currentSession)
  const invalidateCacheAdapter = new InvalidateCacheByKeyProtocolSpy()
  const getAccountByIdRepository = new GetEntityByIdRepositorySpy<AccountModel>()
  jest.spyOn(getAccountByIdRepository, 'getById').mockResolvedValue(account)
  const createAccessSessionUseCase = new CreateEntityUseCaseSpy<AccessSessionPayloadModel, CreateAccessSessionDTO>()
  const sut = new DbRefreshAccessTokenUseCase(
    getAccessSessionByTokenUseCase,
    invalidateCacheAdapter,
    getAccountByIdRepository,
    createAccessSessionUseCase
  )
  return {
    sut,
    refreshAccessTokenDTO,
    settings,
    currentSession,
    account,
    getAccessSessionByTokenUseCase,
    invalidateCacheAdapter,
    getAccountByIdRepository,
    createAccessSessionUseCase
  }
}

describe('DbRefreshAccessTokenUseCase', () => {
  describe('Get AccessSession By Token', () => {
    test('Should call GetAccessSessionByTokenUseCase with correct values', async () => {
      const { sut, refreshAccessTokenDTO, settings, getAccessSessionByTokenUseCase } = makeSut()
      const getByTokenSpy = jest.spyOn(getAccessSessionByTokenUseCase, 'getByToken')
      await sut.refresh(refreshAccessTokenDTO, settings)
      expect(getByTokenSpy).toHaveBeenCalledWith(refreshAccessTokenDTO.access_token)
    })

    test('Should fails if GetAccessSessionByTokenUseCase fails', async () => {
      const { sut, refreshAccessTokenDTO, settings, getAccessSessionByTokenUseCase } = makeSut()
      const error = new Error()
      jest.spyOn(getAccessSessionByTokenUseCase, 'getByToken').mockRejectedValue(error)
      const promise = sut.refresh(refreshAccessTokenDTO, settings)
      await expect(promise).rejects.toThrow(error)
    })
  })

  describe('Invalided old session in cache', () => {
    test('Should call InvalidateCacheAdapter with correct values', async () => {
      const { sut, refreshAccessTokenDTO, settings, invalidateCacheAdapter, currentSession } = makeSut()
      const invalidateByKeySpy = jest.spyOn(invalidateCacheAdapter, 'invalidateByKey')
      await sut.refresh(refreshAccessTokenDTO, settings)
      expect(invalidateByKeySpy).toHaveBeenCalledWith(`session:${currentSession.account_id}:${currentSession.id}`)
    })

    test('Should fails if InvalidateCacheAdapter fails', async () => {
      const { sut, refreshAccessTokenDTO, settings, invalidateCacheAdapter } = makeSut()
      const error = new Error()
      jest.spyOn(invalidateCacheAdapter, 'invalidateByKey').mockRejectedValue(error)
      const promise = sut.refresh(refreshAccessTokenDTO, settings)
      await expect(promise).rejects.toThrow(error)
    })
  })

  describe('Get Account', () => {
    test('Should call GetAccountByIdRepository with correct values', async () => {
      const { sut, refreshAccessTokenDTO, settings, getAccountByIdRepository, currentSession } = makeSut()
      const getByIdSpy = jest.spyOn(getAccountByIdRepository, 'getById')
      await sut.refresh(refreshAccessTokenDTO, settings)
      expect(getByIdSpy).toHaveBeenCalledWith(currentSession.account_id)
    })

    test('Should fails if GetAccountByIdRepository fails', async () => {
      const { sut, refreshAccessTokenDTO, settings, getAccountByIdRepository } = makeSut()
      const error = new Error()
      jest.spyOn(getAccountByIdRepository, 'getById').mockRejectedValue(error)
      const promise = sut.refresh(refreshAccessTokenDTO, settings)
      await expect(promise).rejects.toThrow(error)
    })
  })

  describe('Create a new AccessSession', () => {
    test('Should call CreateAccessSessionUseCase with correct values', async () => {
      const { sut, refreshAccessTokenDTO, settings, createAccessSessionUseCase, account } = makeSut()
      const createSpy = jest.spyOn(createAccessSessionUseCase, 'create')
      await sut.refresh(refreshAccessTokenDTO, settings)
      expect(createSpy).toHaveBeenCalledWith({
        ...account,
        ip: refreshAccessTokenDTO.ip
      }, settings)
    })

    test('Should fails if CreateAccessSessionUseCase fails', async () => {
      const { sut, refreshAccessTokenDTO, settings, createAccessSessionUseCase } = makeSut()
      const error = new Error()
      jest.spyOn(createAccessSessionUseCase, 'create').mockRejectedValue(error)
      const promise = sut.refresh(refreshAccessTokenDTO, settings)
      await expect(promise).rejects.toThrow(error)
    })
  })

  describe('Return correct values', () => {
    test('Should return same CreateAccessSessionUseCase returns', async () => {
      const { sut, refreshAccessTokenDTO, settings, createAccessSessionUseCase } = makeSut()
      const expectedAccessSession = mockAccessSessionPayloadModel()
      jest.spyOn(createAccessSessionUseCase, 'create').mockResolvedValue(expectedAccessSession)
      const response = await sut.refresh(refreshAccessTokenDTO, settings)
      expect(response).toEqual(expectedAccessSession)
    })
  })
})
