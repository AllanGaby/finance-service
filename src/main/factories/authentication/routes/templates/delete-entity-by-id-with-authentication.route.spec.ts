import { makeDeleteEntityByIdWithAuthenticationRoute } from './delete-entity-by-id-with-authentication.route'
import { CheckBusinessRuleUseCaseSpy, DeleteEntityByIdUseCaseSpy, EntityModel } from '@/domain/common'
import { DeleteEntityController } from '@/presentation/common'
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
  deleteEntityByIdController?: DeleteEntityController<EntityModel>
  checkBusinessRuleUseCase?: CheckBusinessRuleUseCaseSpy
}

const makeSut = (
  paramIdName: string = database.column(),
  params: sutDTO = {
    checkBusinessRuleUseCase: undefined,
    deleteEntityByIdController: undefined
  }): sutTypes => {
  makeDeleteEntityByIdWithAuthenticationRoute({
    repositoryType: RepositoryType.Memory,
    cacheType: CacheType.Memory,
    accessTokenName: database.column(),
    secret: datatype.uuid(),
    privateKey,
    publicKey
  }, DefaultEntity, paramIdName, [],
  params.deleteEntityByIdController,
  params.checkBusinessRuleUseCase)
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

  describe('DeleteEntityByIdController and CheckBusinessRuleUseCase are not provided', () => {
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

  describe('DeleteEntityByIdController is provided', () => {
    test('Should call router with correct http method', () => {
      const deleteSpy = jest.spyOn(RouterSpy, 'delete')
      const paramIdName = database.column()
      makeSut(paramIdName, {
        deleteEntityByIdController: new DeleteEntityController<EntityModel>(
          new DeleteEntityByIdUseCaseSpy<EntityModel>(),
          paramIdName
        )
      })
      expect(deleteSpy).toHaveBeenCalled()
    })

    test('Should call router with correct url', () => {
      const deleteSpy = jest.spyOn(RouterSpy, 'delete')
      const paramIdName = database.column()
      makeSut(paramIdName, {
        deleteEntityByIdController: new DeleteEntityController<EntityModel>(
          new DeleteEntityByIdUseCaseSpy<EntityModel>(),
          paramIdName
        )
      })
      expect(deleteSpy).toHaveBeenCalledWith(
      `/:${paramIdName}`,
      expect.any(Function),
      expect.any(Function),
      expect.any(Function)
      )
    })
  })

  describe('CheckBusinessRuleUseCase is provided', () => {
    test('Should call router with correct http method', () => {
      const deleteSpy = jest.spyOn(RouterSpy, 'delete')
      const paramIdName = database.column()
      makeSut(paramIdName, {
        checkBusinessRuleUseCase: new CheckBusinessRuleUseCaseSpy<EntityModel>()
      })
      expect(deleteSpy).toHaveBeenCalled()
    })

    test('Should call router with correct url', () => {
      const deleteSpy = jest.spyOn(RouterSpy, 'delete')
      const paramIdName = database.column()
      makeSut(paramIdName, {
        checkBusinessRuleUseCase: new CheckBusinessRuleUseCaseSpy<EntityModel>()
      })
      expect(deleteSpy).toHaveBeenCalledWith(
      `/:${paramIdName}`,
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
      expect.any(Function)
      )
    })
  })
})
