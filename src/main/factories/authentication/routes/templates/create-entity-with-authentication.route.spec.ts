import { makeCreateEntityWithAuthenticationRoute } from './create-entity-with-authentication.route'
import { CheckBusinessRuleUseCaseSpy, CreateEntityUseCaseSpy, EntityModel } from '@/domain/common'
import { mockFieldValidationModel } from '@/protocols/request-validator'
import { DefaultEntity, RepositoryType } from '@/infrastructure/repositories'
import { CreateEntityController } from '@/presentation/common'
import { ExpressRouterSpy } from '@/main/factories/common/mocks'
import { ConfigSetup, ConfigurationModel } from '@/main/application/config'
import { CacheType } from '@/infrastructure/cache'
import { database, datatype } from 'faker'

let RouterSpy: ExpressRouterSpy

jest.mock('express', () => ({
  Router: () => (RouterSpy)
}))

type sutDTO = {
  createEntityController?: CreateEntityController<EntityModel>
  checkBusinessRuleUseCase?: CheckBusinessRuleUseCaseSpy
}

const makeSut = (params: sutDTO = {
  checkBusinessRuleUseCase: undefined,
  createEntityController: undefined
}): void => {
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
  }, DefaultEntity, fieldsValidation, [],
  params.createEntityController,
  params.checkBusinessRuleUseCase
  )
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

  describe('CreateEntityController and CheckBusinessRuleUseCase are not provided', () => {
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

  describe('CreateEntityController is provided', () => {
    test('Should call router with correct http method', () => {
      const postSpy = jest.spyOn(RouterSpy, 'post')
      makeSut({
        createEntityController: new CreateEntityController<EntityModel>(
          new CreateEntityUseCaseSpy<EntityModel>()
        )
      })
      expect(postSpy).toHaveBeenCalled()
    })

    test('Should call router with correct url', () => {
      const postSpy = jest.spyOn(RouterSpy, 'post')
      makeSut({
        createEntityController: new CreateEntityController<EntityModel>(
          new CreateEntityUseCaseSpy<EntityModel>()
        )
      })
      expect(postSpy).toHaveBeenCalledWith(
        '/',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      )
    })
  })

  describe('CheckBusinessRuleUseCase is provided', () => {
    test('Should call router with correct http method', () => {
      const postSpy = jest.spyOn(RouterSpy, 'post')
      makeSut({
        checkBusinessRuleUseCase: new CheckBusinessRuleUseCaseSpy<EntityModel>()
      })
      expect(postSpy).toHaveBeenCalled()
    })

    test('Should call router with correct url', () => {
      const postSpy = jest.spyOn(RouterSpy, 'post')
      makeSut({
        checkBusinessRuleUseCase: new CheckBusinessRuleUseCaseSpy<EntityModel>()
      })
      expect(postSpy).toHaveBeenCalledWith(
        '/',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      )
    })
  })
})
