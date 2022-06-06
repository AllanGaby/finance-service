import { makeCreateEntityRoute } from './create-entity.route'
import { CheckBusinessRuleUseCaseSpy, CreateEntityUseCaseSpy, EntityModel } from '@/domain/common'
import { mockFieldValidationModel } from '@/protocols/request-validator'
import { DefaultEntity, RepositoryType } from '@/infrastructure/repositories'
import { CreateEntityController } from '@/presentation/common'
import { ExpressRouterSpy } from '@/main/factories/common/mocks'

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
  makeCreateEntityRoute({
    repositoryType: RepositoryType.Memory
  }, DefaultEntity, fieldsValidation,
  params.createEntityController,
  params.checkBusinessRuleUseCase
  )
}

describe('makeCreateEntityRoute', () => {
  beforeEach(() => {
    RouterSpy = new ExpressRouterSpy()
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
        expect.any(Function)
      )
    })
  })
})
