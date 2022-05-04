import { DbUpdateSettingsByIdUseCase } from './db-update-settings-by-id.use-case'
import {
  CreateNewEntityVersionUseCaseSpy,
  UpdateEntityDTO,
  SettingsModel,
  mockSettingsModel
} from '@/domain/common'
import { InvalidateCacheByKeyProtocolSpy, CreateCacheProtocolSpy } from '@/protocols/cache'
import { datatype } from 'faker'

type sutTypes = {
  sut: DbUpdateSettingsByIdUseCase
  settingsId: string
  updateSettingsDTO: UpdateEntityDTO<SettingsModel>
  createNewEntityVersionUseCase: CreateNewEntityVersionUseCaseSpy<SettingsModel>
  invalidateCacheByKeyAdapter: InvalidateCacheByKeyProtocolSpy
  createCacheAdapter: CreateCacheProtocolSpy
}

const makeSut = (): sutTypes => {
  const createNewEntityVersionUseCase = new CreateNewEntityVersionUseCaseSpy<SettingsModel>()
  const invalidateCacheByKeyAdapter = new InvalidateCacheByKeyProtocolSpy()
  const createCacheAdapter = new CreateCacheProtocolSpy()
  const sut = new DbUpdateSettingsByIdUseCase(
    createNewEntityVersionUseCase,
    invalidateCacheByKeyAdapter,
    createCacheAdapter
  )
  return {
    sut,
    settingsId: datatype.uuid(),
    updateSettingsDTO: mockSettingsModel(),
    createNewEntityVersionUseCase,
    invalidateCacheByKeyAdapter,
    createCacheAdapter
  }
}

describe('DbUpdateSettingsByIdUseCase', () => {
  describe('Create a new Settings Version', () => {
    test('Should call CreateNewEntityVersionUseCase with correct value', async () => {
      const { sut, settingsId, updateSettingsDTO, createNewEntityVersionUseCase } = makeSut()
      const createVersionSpy = jest.spyOn(createNewEntityVersionUseCase, 'createVersion')
      await sut.updateById(settingsId, updateSettingsDTO)
      expect(createVersionSpy).toHaveBeenCalledWith(settingsId, updateSettingsDTO)
    })

    test('Should fails if CreateNewEntityVersionUseCase fails', async () => {
      const { sut, settingsId, updateSettingsDTO, createNewEntityVersionUseCase } = makeSut()
      jest.spyOn(createNewEntityVersionUseCase, 'createVersion').mockRejectedValue(new Error())
      const promise = sut.updateById(settingsId, updateSettingsDTO)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('Refresh Settings in Cache', () => {
    test('Should call InvalidateCacheByKeyAdapter with correct value', async () => {
      const { sut, settingsId, updateSettingsDTO, invalidateCacheByKeyAdapter } = makeSut()
      const invalidateByKeySpy = jest.spyOn(invalidateCacheByKeyAdapter, 'invalidateByKey')
      await sut.updateById(settingsId, updateSettingsDTO)
      expect(invalidateByKeySpy).toHaveBeenCalledWith('current-settings')
    })

    test('Should call CreateCacheAdapter with correct value', async () => {
      const { sut, settingsId, updateSettingsDTO, createCacheAdapter, createNewEntityVersionUseCase } = makeSut()
      const settings = mockSettingsModel()
      jest.spyOn(createNewEntityVersionUseCase, 'createVersion').mockResolvedValue(settings)
      const createSpy = jest.spyOn(createCacheAdapter, 'create')
      await sut.updateById(settingsId, updateSettingsDTO)
      expect(createSpy).toHaveBeenCalledWith({
        key: 'current-settings',
        record: settings
      })
    })
  })

  describe('Return correct value', () => {
    test('Should return same CreateNewEntityVersionUseCase returns', async () => {
      const { sut, settingsId, updateSettingsDTO, createNewEntityVersionUseCase } = makeSut()
      const newSettingsVersion = mockSettingsModel()
      jest.spyOn(createNewEntityVersionUseCase, 'createVersion').mockResolvedValue(newSettingsVersion)
      const response = await sut.updateById(settingsId, updateSettingsDTO)
      expect(response).toEqual(newSettingsVersion)
    })
  })
})
