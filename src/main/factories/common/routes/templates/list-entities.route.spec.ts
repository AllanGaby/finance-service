import { makeListEntitiesRoute } from './list-entities.route'
import { CheckBusinessRuleUseCaseSpy, EntityModel, ListEntitiesUseCaseSpy } from '@/domain/common'
import { DefaultEntity, RepositoryType } from '@/infrastructure/repositories'
import { ListEntitiesController } from '@/presentation/common'
import { ExpressRouterSpy } from '@/main/factories/common/mocks'

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
  makeListEntitiesRoute({
    repositoryType: RepositoryType.Memory
  }, DefaultEntity, [], [], [],
  params.listEntitiesController,
  params.checkBusinessRuleUseCase)
}

describe('makeListEntitiesRoute', () => {
  beforeEach(() => {
    RouterSpy = new ExpressRouterSpy()
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
        expect.any(Function)
      )
    })
  })
})
