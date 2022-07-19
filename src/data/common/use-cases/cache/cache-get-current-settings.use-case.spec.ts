import { CacheGetCurrentSettingsUseCase } from './cache-get-current-settings.use-case'
import { CustomFilterConditional, CustomFilterOperator, mockSettingsModel, SettingsModel } from '@/domain/common'
import { RecoverCacheByKeyProtocolSpy, CreateCacheProtocolSpy } from '@/protocols/cache'
import { EntityIsNotFoundError } from '@/data/common/errors'
import { GetOneEntityRepositorySpy } from '@/protocols/repositories'

type sutTypes = {
  sut: CacheGetCurrentSettingsUseCase
  recoverSettingsInCacheAdapter: RecoverCacheByKeyProtocolSpy
  getSettingsRepository: GetOneEntityRepositorySpy<SettingsModel>
  setSettingsInCacheAdapter: CreateCacheProtocolSpy
}

const makeSut = (): sutTypes => {
  const recoverSettingsInCacheAdapter = new RecoverCacheByKeyProtocolSpy()
  const setSettingsInCacheAdapter = new CreateCacheProtocolSpy()
  const getSettingsRepository = new GetOneEntityRepositorySpy<SettingsModel>()
  const sut = new CacheGetCurrentSettingsUseCase(recoverSettingsInCacheAdapter, getSettingsRepository, setSettingsInCacheAdapter)
  return {
    sut,
    recoverSettingsInCacheAdapter,
    getSettingsRepository,
    setSettingsInCacheAdapter
  }
}

describe('CacheGetCurrentSettingsUseCase', () => {
  describe('Get Settings in Cache', () => {
    test('Should call RecoverSettingsInCacheAdapter with correct value', async () => {
      const { sut, recoverSettingsInCacheAdapter } = makeSut()
      const recoverSpy = jest.spyOn(recoverSettingsInCacheAdapter, 'recover')
      await sut.getCurrentSettings()
      expect(recoverSpy).toHaveBeenCalledWith('current-settings')
    })

    test('Should return EntityIsNotFoundError if RecoverSettingsInCacheAdapter fails', async () => {
      const { sut, recoverSettingsInCacheAdapter } = makeSut()
      jest.spyOn(recoverSettingsInCacheAdapter, 'recover').mockRejectedValue(new Error())
      const promise = sut.getCurrentSettings()
      await expect(promise).rejects.toThrowError(EntityIsNotFoundError)
    })

    test('Should return same RecoverSettingsInCacheAdapter returns if return any settings', async () => {
      const { sut, recoverSettingsInCacheAdapter } = makeSut()
      const settings = mockSettingsModel()
      jest.spyOn(recoverSettingsInCacheAdapter, 'recover').mockResolvedValue(settings)
      const result = await sut.getCurrentSettings()
      expect(result).toEqual(settings)
    })
  })

  describe('Get Settings in Database', () => {
    test('Should call getSettingsRepository with correct value', async () => {
      const { sut, getSettingsRepository, recoverSettingsInCacheAdapter } = makeSut()
      jest.spyOn(recoverSettingsInCacheAdapter, 'recover').mockResolvedValue(undefined)
      const getOneSpy = jest.spyOn(getSettingsRepository, 'getOne')
      await sut.getCurrentSettings()
      expect(getOneSpy).toHaveBeenCalledWith([{
        field: 'version',
        conditional: CustomFilterConditional.isEmpty,
        operator: CustomFilterOperator.and,
        value: undefined
      }])
    })

    test('Should return same getSettingsRepository returns', async () => {
      const { sut, getSettingsRepository, recoverSettingsInCacheAdapter } = makeSut()
      jest.spyOn(recoverSettingsInCacheAdapter, 'recover').mockResolvedValue(undefined)
      const settings = mockSettingsModel()
      jest.spyOn(getSettingsRepository, 'getOne').mockResolvedValue(settings)
      const response = await sut.getCurrentSettings()
      expect(response).toEqual(settings)
    })

    describe('Set Settings in Cache', () => {
      test('Should call SetSettingsInCacheAdapter with correct value', async () => {
        const { sut, recoverSettingsInCacheAdapter, getSettingsRepository, setSettingsInCacheAdapter } = makeSut()
        jest.spyOn(recoverSettingsInCacheAdapter, 'recover').mockResolvedValue(undefined)
        const settings = mockSettingsModel()
        jest.spyOn(getSettingsRepository, 'getOne').mockResolvedValue(settings)
        const createSpy = jest.spyOn(setSettingsInCacheAdapter, 'create')
        await sut.getCurrentSettings()
        expect(createSpy).toHaveBeenCalledWith({
          key: 'current-settings',
          record: settings
        })
      })

      test('Should return EntityIsNotFoundError if RecoverSettingsInCacheAdapter fails', async () => {
        const { sut, recoverSettingsInCacheAdapter, setSettingsInCacheAdapter, getSettingsRepository } = makeSut()
        jest.spyOn(recoverSettingsInCacheAdapter, 'recover').mockResolvedValue(undefined)
        jest.spyOn(setSettingsInCacheAdapter, 'create').mockRejectedValue(new Error())
        jest.spyOn(getSettingsRepository, 'getOne').mockResolvedValue(mockSettingsModel())
        const promise = sut.getCurrentSettings()
        await expect(promise).rejects.toThrowError(EntityIsNotFoundError)
      })
    })
  })
})
