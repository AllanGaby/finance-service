import { makeGetEntityByIdWithAuthenticationRoute } from './get-entity-by-id-with-authentication.route'
import { DefaultEntity, RepositoryType } from '@/infrastructure/repositories'
import { ExpressRouterSpy } from '@/main/factories/common/mocks'
import { ConfigSetup, ConfigurationModel } from '@/main/application/config'
import { database, datatype } from 'faker'
import { CacheType } from '@/infrastructure/cache'

let RouterSpy: ExpressRouterSpy

jest.mock('express', () => ({
  Router: () => (RouterSpy)
}))

type sutTypes = {
  paramIdName: string
}

const makeSut = (): sutTypes => {
  const paramIdName = database.column()
  makeGetEntityByIdWithAuthenticationRoute({
    repositoryType: RepositoryType.Memory,
    cacheType: CacheType.Memory,
    accessTokenName: database.column(),
    secret: datatype.uuid(),
    privateKey,
    publicKey
  }, DefaultEntity, paramIdName, database.column(), [])
  return {
    paramIdName
  }
}

const config: ConfigurationModel = ConfigSetup()
let privateKey: string
let publicKey: string

describe('makeGetEntityByIdWithAuthenticationRoute', () => {
  beforeEach(() => {
    RouterSpy = new ExpressRouterSpy()
  })

  beforeAll(async () => {
    privateKey = await config.security.getPrivateKey()
    publicKey = await config.security.getPublicKey()
  })

  test('Should call router with correct http method', () => {
    const getSpy = jest.spyOn(RouterSpy, 'get')
    makeSut()
    expect(getSpy).toHaveBeenCalled()
  })

  test('Should call router with correct url', () => {
    const getSpy = jest.spyOn(RouterSpy, 'get')
    const { paramIdName } = makeSut()
    expect(getSpy).toHaveBeenCalledWith(
      `/:${paramIdName}`,
      expect.any(Function),
      expect.any(Function),
      expect.any(Function)
    )
  })
})
