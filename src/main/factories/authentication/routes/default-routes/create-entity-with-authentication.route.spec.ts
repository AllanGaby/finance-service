import { makeCreateEntityWithAuthenticationRoute } from './create-entity-with-authentication.route'
import { mockFieldValidationModel } from '@/protocols/request-validator'
import { DefaultEntity, RepositoryType } from '@/infrastructure/repositories'
import { CacheType } from '@/infrastructure/cache'
import { ConfigSetup, ConfigurationModel } from '@/main/application/config'
import { ExpressRouterSpy } from '@/main/factories/common/mocks'
import { database, datatype } from 'faker'

let RouterSpy: ExpressRouterSpy

jest.mock('express', () => ({
  Router: () => (RouterSpy)
}))

const makeSut = (): void => {
  const fieldsValidation = [
    mockFieldValidationModel(),
    mockFieldValidationModel(),
    mockFieldValidationModel(),
    mockFieldValidationModel()
  ]
  makeCreateEntityWithAuthenticationRoute({
    repositoryType: RepositoryType.Memory,
    cacheType: CacheType.Memory,
    accessTokenName: database.column(),
    secret: datatype.uuid(),
    privateKey,
    publicKey
  }, DefaultEntity, fieldsValidation, [])
}

const config: ConfigurationModel = ConfigSetup()
let privateKey: string
let publicKey: string

describe('makeCreateEntityWithAuthenticationRoute', () => {
  beforeEach(() => {
    RouterSpy = new ExpressRouterSpy()
  })

  beforeAll(async () => {
    privateKey = await config.security.getPrivateKey()
    publicKey = await config.security.getPublicKey()
  })

  test('Should call router with correct http method', () => {
    const postSpy = jest.spyOn(RouterSpy, 'post')
    makeSut()
    expect(postSpy).toHaveBeenCalled()
  })

  test('Should call router with correct url', () => {
    const postSpy = jest.spyOn(RouterSpy, 'post')
    makeSut()
    expect(postSpy).toHaveBeenCalledWith(
      '/',
      expect.any(Function),
      expect.any(Function),
      expect.any(Function)
    )
  })
})
