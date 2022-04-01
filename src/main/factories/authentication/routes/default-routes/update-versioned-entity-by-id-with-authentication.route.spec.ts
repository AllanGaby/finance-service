import { makeUpdateVersionedEntityByIdWithAuthenticationRoute } from './update-versioned-entity-by-id-with-authentication.route'
import { mockFieldValidationModel } from '@/protocols/request-validator'
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

const makeSut = (putMethod?: boolean): sutTypes => {
  const fieldsValidation = [
    mockFieldValidationModel(),
    mockFieldValidationModel(),
    mockFieldValidationModel(),
    mockFieldValidationModel()
  ]
  const paramIdName = database.column()
  makeUpdateVersionedEntityByIdWithAuthenticationRoute({
    repositoryType: RepositoryType.Memory,
    cacheType: CacheType.Memory,
    accessTokenName: database.column(),
    secret: datatype.uuid(),
    privateKey,
    publicKey
  }, DefaultEntity, paramIdName, database.column(), fieldsValidation, [], putMethod)
  return {
    paramIdName
  }
}

const config: ConfigurationModel = ConfigSetup()
let privateKey: string
let publicKey: string

describe('makeUpdateVersionedEntityByIdWithAuthenticationRoute', () => {
  beforeEach(() => {
    RouterSpy = new ExpressRouterSpy()
  })

  beforeAll(async () => {
    privateKey = await config.security.getPrivateKey()
    publicKey = await config.security.getPublicKey()
  })

  describe('Put Method is not provided', () => {
    test('Should call router with correct http method', () => {
      const putSpy = jest.spyOn(RouterSpy, 'put')
      makeSut()
      expect(putSpy).toHaveBeenCalled()
    })

    test('Should call router with correct url', () => {
      const putSpy = jest.spyOn(RouterSpy, 'put')
      const { paramIdName } = makeSut()
      expect(putSpy).toHaveBeenCalledWith(
        `/:${paramIdName}`,
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      )
    })
  })

  describe('Put Method is true', () => {
    test('Should call router with correct http method', () => {
      const putSpy = jest.spyOn(RouterSpy, 'put')
      makeSut(true)
      expect(putSpy).toHaveBeenCalled()
    })

    test('Should call router with correct url', () => {
      const putSpy = jest.spyOn(RouterSpy, 'put')
      const { paramIdName } = makeSut(true)
      expect(putSpy).toHaveBeenCalledWith(
        `/:${paramIdName}`,
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      )
    })
  })

  describe('Put Method is false', () => {
    test('Should call router with correct http method', () => {
      const patchSpy = jest.spyOn(RouterSpy, 'patch')
      makeSut(false)
      expect(patchSpy).toHaveBeenCalled()
    })

    test('Should call router with correct url', () => {
      const patchSpy = jest.spyOn(RouterSpy, 'patch')
      const { paramIdName } = makeSut(false)
      expect(patchSpy).toHaveBeenCalledWith(
        `/:${paramIdName}`,
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      )
    })
  })
})
