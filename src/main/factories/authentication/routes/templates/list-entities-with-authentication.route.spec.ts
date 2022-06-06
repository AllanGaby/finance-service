import { makeListEntitiesWithAuthenticationRoute } from './list-entities-with-authentication.route'
import { CheckBusinessRuleUseCaseSpy, EntityModel, ListEntitiesUseCaseSpy } from '@/domain/common'
import { DefaultEntity, RepositoryType } from '@/infrastructure/repositories'
import { CacheType } from '@/infrastructure/cache'
import { ListEntitiesController } from '@/presentation/common'
import { ExpressRouterSpy } from '@/main/factories/common/mocks'
import { ConfigSetup, ConfigurationModel } from '@/main/application/config'
import { database, datatype } from 'faker'

let RouterSpy: ExpressRouterSpy

jest.mock('express', () => ({
  Router: () => (RouterSpy)
}))

type sutDTO = {
  listEntitiesController?: ListEntitiesController<EntityModel>
  checkBusinessRuleUseCase?: CheckBusinessRuleUseCaseSpy
}

const makeSut = (params: sutDTO = {
  checkBusinessRuleUseCase: undefined,
  listEntitiesController: undefined
}): void => {
  makeListEntitiesWithAuthenticationRoute({
    repositoryType: RepositoryType.Memory,
    cacheType: CacheType.Memory,
    accessTokenName: database.column(),
    secret: datatype.uuid(),
    privateKey,
    publicKey
  }, DefaultEntity, [], [], [], [],
  params.listEntitiesController,
  params.checkBusinessRuleUseCase)
}

const config: ConfigurationModel = ConfigSetup()
let privateKey: string
let publicKey: string

describe('makeListEntitiesWithAuthenticationRoute', () => {
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
      makeSut()
      expect(getSpy).toHaveBeenCalledWith(
        '/',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      )
    })
  })

  describe('GetEntityByIdController is provided', () => {
    test('Should call router with correct http method', () => {
      const getSpy = jest.spyOn(RouterSpy, 'get')
      makeSut({
        listEntitiesController: new ListEntitiesController<EntityModel>(
          new ListEntitiesUseCaseSpy<EntityModel>()
        )
      })
      expect(getSpy).toHaveBeenCalled()
    })

    test('Should call router with correct url', () => {
      const getSpy = jest.spyOn(RouterSpy, 'get')
      makeSut({
        listEntitiesController: new ListEntitiesController<EntityModel>(
          new ListEntitiesUseCaseSpy<EntityModel>()
        )
      })
      expect(getSpy).toHaveBeenCalledWith(
        '/',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      )
    })
  })

  describe('CheckBusinessRuleUseCase is provided', () => {
    test('Should call router with correct http method', () => {
      const getSpy = jest.spyOn(RouterSpy, 'get')
      makeSut({
        checkBusinessRuleUseCase: new CheckBusinessRuleUseCaseSpy<EntityModel>()
      })
      expect(getSpy).toHaveBeenCalled()
    })

    test('Should call router with correct url', () => {
      const getSpy = jest.spyOn(RouterSpy, 'get')
      makeSut({
        checkBusinessRuleUseCase: new CheckBusinessRuleUseCaseSpy<EntityModel>()
      })
      expect(getSpy).toHaveBeenCalledWith(
        '/',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      )
    })
  })
})
