import { makeGetEntityByIdWithAuthenticationRoute } from './get-entity-by-id-with-authentication.route'
import { CheckBusinessRuleUseCaseSpy, EntityModel, GetEntityByIdUseCaseSpy } from '@/domain/common'
import { GetEntityByIdController } from '@/presentation/common'
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

type sutDTO = {
  getEntityByIdController?: GetEntityByIdController<EntityModel>
  checkBusinessRuleUseCase?: CheckBusinessRuleUseCaseSpy
}

const makeSut = (paramIdName: string = database.column(),
  params: sutDTO = {
    checkBusinessRuleUseCase: undefined,
    getEntityByIdController: undefined
  }): sutTypes => {
  makeGetEntityByIdWithAuthenticationRoute({
    repositoryType: RepositoryType.Memory,
    cacheType: CacheType.Memory,
    accessTokenName: database.column(),
    secret: datatype.uuid(),
    privateKey,
    publicKey
  }, DefaultEntity, paramIdName, database.column(), [],
  params.getEntityByIdController,
  params.checkBusinessRuleUseCase)
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

  describe('GetEntityByIdController and CheckBusinessRuleUseCase are not provided', () => {
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

  describe('GetEntityByIdController is provided', () => {
    test('Should call router with correct http method', () => {
      const getSpy = jest.spyOn(RouterSpy, 'get')
      const paramIdName = database.column()
      makeSut(paramIdName, {
        getEntityByIdController: new GetEntityByIdController<EntityModel>(
          new GetEntityByIdUseCaseSpy<EntityModel>(),
          paramIdName
        )
      })
      expect(getSpy).toHaveBeenCalled()
    })

    test('Should call router with correct url', () => {
      const getSpy = jest.spyOn(RouterSpy, 'get')
      const paramIdName = database.column()
      makeSut(paramIdName, {
        getEntityByIdController: new GetEntityByIdController<EntityModel>(
          new GetEntityByIdUseCaseSpy<EntityModel>(),
          paramIdName
        )
      })
      expect(getSpy).toHaveBeenCalledWith(
        `/:${paramIdName}`,
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      )
    })
  })

  describe('CheckBusinessRuleUseCase is provided', () => {
    test('Should call router with correct http method', () => {
      const getSpy = jest.spyOn(RouterSpy, 'get')
      const paramIdName = database.column()
      makeSut(paramIdName, {
        checkBusinessRuleUseCase: new CheckBusinessRuleUseCaseSpy<EntityModel>()
      })
      expect(getSpy).toHaveBeenCalled()
    })

    test('Should call router with correct url', () => {
      const getSpy = jest.spyOn(RouterSpy, 'get')
      const paramIdName = database.column()
      makeSut(paramIdName, {
        checkBusinessRuleUseCase: new CheckBusinessRuleUseCaseSpy<EntityModel>()
      })
      expect(getSpy).toHaveBeenCalledWith(
        `/:${paramIdName}`,
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      )
    })
  })
})
