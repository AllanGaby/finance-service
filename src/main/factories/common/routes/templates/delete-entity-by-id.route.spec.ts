import { makeDeleteEntityByIdRoute } from './delete-entity-by-id.route'
import { CheckBusinessRuleUseCaseSpy, DeleteEntityByIdUseCaseSpy, EntityModel } from '@/domain/common'
import { DeleteEntityController } from '@/presentation/common'
import { DefaultEntity, RepositoryType } from '@/infrastructure/repositories'
import { ExpressRouterSpy } from '@/main/factories/common/mocks'
import { database } from 'faker'

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
  makeDeleteEntityByIdRoute({
    repositoryType: RepositoryType.Memory
  }, DefaultEntity, paramIdName,
  params.deleteEntityByIdController,
  params.checkBusinessRuleUseCase)
  return {
    paramIdName
  }
}

describe('makeDeleteEntityByIdRoute', () => {
  beforeEach(() => {
    RouterSpy = new ExpressRouterSpy()
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
      expect.any(Function)
      )
    })
  })
})
