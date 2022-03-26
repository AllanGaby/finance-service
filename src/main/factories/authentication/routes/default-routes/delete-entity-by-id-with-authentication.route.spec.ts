import { makeDeleteEntityByIdWithAuthenticationRoute } from './delete-entity-by-id-with-authentication.route'
import { DefaultEntity, RepositoryType } from '@/infrastructure/repositories'
import { CacheType } from '@/infrastructure/cache'
import { ExpressRouterSpy } from '@/main/factories/common/mocks'
import { ConfigSetup, ConfigurationModel } from '@/main/application/config'
import { database, datatype } from 'faker'

let RouterSpy: ExpressRouterSpy

jest.mock('express', () => ({
  Router: () => (RouterSpy)
}))

type sutTypes = {
  paramIdName: string
}

const makeSut = (): sutTypes => {
  const paramIdName = database.column()
  makeDeleteEntityByIdWithAuthenticationRoute({
    repositoryType: RepositoryType.Memory,
    cacheType: CacheType.Memory,
    accessTokenName: database.column(),
    secret: datatype.uuid(),
    privateKey,
    publicKey
  }, DefaultEntity, paramIdName, [])
  return {
    paramIdName
  }
}

const config: ConfigurationModel = ConfigSetup()
let privateKey: string
let publicKey: string

describe('makeDeleteEntityByIdWithAuthenticationRoute', () => {
  beforeEach(() => {
    RouterSpy = new ExpressRouterSpy()
  })

  beforeAll(async () => {
    privateKey = await config.security.getPrivateKey()
    publicKey = await config.security.getPublicKey()
  })

  test('Should call router with correct http method', () => {
    const deleteSpy = jest.spyOn(RouterSpy, 'delete')
    makeSut()
    expect(deleteSpy).toHaveBeenCalled()
  })

  test('Should call router with correct url', () => {
    const deleteSpy = jest.spyOn(RouterSpy, 'delete')
    const { paramIdName } = makeSut()
    expect(deleteSpy).toHaveBeenCalledWith(
      `/:${paramIdName}`,
      expect.any(Function),
      expect.any(Function),
      expect.any(Function)
    )
  })
})
