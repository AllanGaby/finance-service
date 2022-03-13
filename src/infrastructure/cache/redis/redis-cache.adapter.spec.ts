import { RedisCacheAdapter } from './redis-cache.adapter'
import { mockCreateCacheDTO } from '@/protocols/cache'
import { ConfigSetup, ConfigurationModel } from '@/main/application/config'
import { datatype } from 'faker'

type sutTypes = {
  sut: RedisCacheAdapter
}

let config: ConfigurationModel

const makeSut = (): sutTypes => ({
  sut: RedisCacheAdapter.getInstance(config.cache)
})

describe('RedisCacheAdapter', () => {
  beforeAll(async () => {
    config = ConfigSetup()
  })

  afterEach(() => {
    RedisCacheAdapter.getInstance(config.cache).client.disconnect()
  })

  describe('Create Method', () => {
    test('Should call set of ioredis with correct values', async () => {
      const { sut } = makeSut()
      const request = mockCreateCacheDTO()
      jest.spyOn(sut.client, 'set').mockImplementationOnce(() => {})
      const setSpy = jest.spyOn(sut.client, 'set')
      await sut.create(request)
      expect(setSpy).toHaveBeenCalledWith(request.key, JSON.stringify(request.record))
    })
  })

  describe('Recover Method', () => {
    test('Should call get of ioredis with correct values', async () => {
      const { sut } = makeSut()
      const request = mockCreateCacheDTO()
      jest.spyOn(sut.client, 'get').mockImplementationOnce(async (key: string): Promise<string> => { return JSON.stringify(request.record) })
      const getSpy = jest.spyOn(sut.client, 'get')
      await sut.recover(request.key)
      expect(getSpy).toHaveBeenCalledWith(request.key)
    })

    test('Should return undefined if key is not found', async () => {
      const { sut } = makeSut()
      jest.spyOn(sut.client, 'get').mockImplementationOnce(async (key: string): Promise<string> => { return undefined })
      const result = await sut.recover(datatype.uuid())
      expect(result).toBeFalsy()
    })

    test('Should return correct record if key is found', async () => {
      const { sut } = makeSut()
      const request = mockCreateCacheDTO()
      jest.spyOn(sut.client, 'get').mockImplementationOnce(async (key: string): Promise<string> => { return JSON.stringify(request.record) })

      const result = await sut.recover(request.key)
      expect(result).toEqual(request.record)
    })
  })

  describe('InvalidateByKey Method', () => {
    test('Should call del of ioredis with correct values', async () => {
      const { sut } = makeSut()
      const request = mockCreateCacheDTO()
      jest.spyOn(sut.client, 'del').mockImplementationOnce(() => { return undefined })
      const delSpy = jest.spyOn(sut.client, 'del')
      await sut.invalidateByKey(request.key)
      expect(delSpy).toHaveBeenCalledWith(request.key)
    })
  })
})
