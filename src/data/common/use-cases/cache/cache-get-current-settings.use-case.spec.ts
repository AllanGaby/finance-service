import { CacheGetCurrentSettingsUseCase } from './cache-get-current-settings.use-case'
import { mockSettingsModel } from '@/domain/common'
import { RecoverCacheByKeyProtocolSpy } from '@/protocols/cache'
import { EntityIsNotFoundError } from '@/data/common/errors'

type sutTypes = {
  sut: CacheGetCurrentSettingsUseCase
  recoverSettingsInCacheAdapter: RecoverCacheByKeyProtocolSpy
}

const makeSut = (): sutTypes => {
  const recoverSettingsInCacheAdapter = new RecoverCacheByKeyProtocolSpy()
  const sut = new CacheGetCurrentSettingsUseCase(recoverSettingsInCacheAdapter)
  return {
    sut,
    recoverSettingsInCacheAdapter
  }
}

describe('CacheGetCurrentSettingsUseCase', () => {
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

  test('Should return same RecoverSettingsInCacheAdapter returns', async () => {
    const { sut, recoverSettingsInCacheAdapter } = makeSut()
    const settings = mockSettingsModel()
    jest.spyOn(recoverSettingsInCacheAdapter, 'recover').mockResolvedValue(settings)
    const result = await sut.getCurrentSettings()
    expect(result).toEqual(settings)
  })
})
