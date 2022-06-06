import { makeUpdateEntityByIdRoute } from './update-entity-by-id.route'
import { CheckBusinessRuleUseCaseSpy, EntityModel, UpdateEntityByIdUseCaseSpy } from '@/domain/common'
import { DefaultEntity, RepositoryType } from '@/infrastructure/repositories'
import { UpdateEntityByIdController } from '@/presentation/common'
import { ExpressRouterSpy } from '@/main/factories/common/mocks'
import { mockFieldValidationModel } from '@/protocols/request-validator'
import { database } from 'faker'

let RouterSpy: ExpressRouterSpy

jest.mock('express', () => ({
  Router: () => (RouterSpy)
}))

type sutTypes = {
  paramIdName: string
}

type sutDTO = {
  updateEntityByIdController?: UpdateEntityByIdController<EntityModel>
  checkBusinessRuleUseCase?: CheckBusinessRuleUseCaseSpy
}

const makeSut = (
  putMethod?: boolean,
  paramIdName: string = database.column(),
  params: sutDTO = {
    checkBusinessRuleUseCase: undefined,
    updateEntityByIdController: undefined
  }): sutTypes => {
  const fieldsValidation = [
    mockFieldValidationModel(),
    mockFieldValidationModel(),
    mockFieldValidationModel(),
    mockFieldValidationModel()
  ]
  makeUpdateEntityByIdRoute({
    repositoryType: RepositoryType.Memory
  }, DefaultEntity, paramIdName, database.column(), fieldsValidation, putMethod,
  params.updateEntityByIdController,
  params.checkBusinessRuleUseCase)
  return {
    paramIdName
  }
}

describe('makeUpdateEntityByIdRoute', () => {
  beforeEach(() => {
    RouterSpy = new ExpressRouterSpy()
  })

  describe('UpdateEntityByIdController and CheckBusinessRuleUseCase are not provided', () => {
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
        expect.any(Function)
        )
      })
    })
  })

  describe('UpdateEntityByIdController is provided', () => {
    describe('Put Method is not provided', () => {
      test('Should call router with correct http method', () => {
        const putSpy = jest.spyOn(RouterSpy, 'put')
        const paramIdName = database.column()
        makeSut(undefined, paramIdName, {
          updateEntityByIdController: new UpdateEntityByIdController<EntityModel>(
            new UpdateEntityByIdUseCaseSpy<EntityModel>(),
            paramIdName
          )
        })
        expect(putSpy).toHaveBeenCalled()
      })

      test('Should call router with correct url', () => {
        const putSpy = jest.spyOn(RouterSpy, 'put')
        const paramIdName = database.column()
        makeSut(undefined, paramIdName, {
          updateEntityByIdController: new UpdateEntityByIdController<EntityModel>(
            new UpdateEntityByIdUseCaseSpy<EntityModel>(),
            paramIdName
          )
        })
        expect(putSpy).toHaveBeenCalledWith(
        `/:${paramIdName}`,
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
        )
      })
    })

    describe('Put Method is true', () => {
      test('Should call router with correct http method', () => {
        const putSpy = jest.spyOn(RouterSpy, 'put')
        const paramIdName = database.column()
        makeSut(true, paramIdName, {
          updateEntityByIdController: new UpdateEntityByIdController<EntityModel>(
            new UpdateEntityByIdUseCaseSpy<EntityModel>(),
            paramIdName
          )
        })
        expect(putSpy).toHaveBeenCalled()
      })

      test('Should call router with correct url', () => {
        const putSpy = jest.spyOn(RouterSpy, 'put')
        const paramIdName = database.column()
        makeSut(true, paramIdName, {
          updateEntityByIdController: new UpdateEntityByIdController<EntityModel>(
            new UpdateEntityByIdUseCaseSpy<EntityModel>(),
            paramIdName
          )
        })
        expect(putSpy).toHaveBeenCalledWith(
        `/:${paramIdName}`,
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
        )
      })
    })

    describe('Put Method is false', () => {
      test('Should call router with correct http method', () => {
        const patchSpy = jest.spyOn(RouterSpy, 'patch')
        const paramIdName = database.column()
        makeSut(false, paramIdName, {
          updateEntityByIdController: new UpdateEntityByIdController<EntityModel>(
            new UpdateEntityByIdUseCaseSpy<EntityModel>(),
            paramIdName
          )
        })
        expect(patchSpy).toHaveBeenCalled()
      })

      test('Should call router with correct url', () => {
        const patchSpy = jest.spyOn(RouterSpy, 'patch')
        const paramIdName = database.column()
        makeSut(false, paramIdName, {
          updateEntityByIdController: new UpdateEntityByIdController<EntityModel>(
            new UpdateEntityByIdUseCaseSpy<EntityModel>(),
            paramIdName
          )
        })
        expect(patchSpy).toHaveBeenCalledWith(
        `/:${paramIdName}`,
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
        )
      })
    })
  })

  describe('CheckBusinessRuleUseCase is provided', () => {
    describe('Put Method is not provided', () => {
      test('Should call router with correct http method', () => {
        const putSpy = jest.spyOn(RouterSpy, 'put')
        const paramIdName = database.column()
        makeSut(undefined, paramIdName, {
          checkBusinessRuleUseCase: new CheckBusinessRuleUseCaseSpy<EntityModel>()
        })
        expect(putSpy).toHaveBeenCalled()
      })

      test('Should call router with correct url', () => {
        const putSpy = jest.spyOn(RouterSpy, 'put')
        const paramIdName = database.column()
        makeSut(undefined, paramIdName, {
          checkBusinessRuleUseCase: new CheckBusinessRuleUseCaseSpy<EntityModel>()
        })
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
        const paramIdName = database.column()
        makeSut(true, paramIdName, {
          checkBusinessRuleUseCase: new CheckBusinessRuleUseCaseSpy<EntityModel>()
        })
        expect(putSpy).toHaveBeenCalled()
      })

      test('Should call router with correct url', () => {
        const putSpy = jest.spyOn(RouterSpy, 'put')
        const paramIdName = database.column()
        makeSut(true, paramIdName, {
          checkBusinessRuleUseCase: new CheckBusinessRuleUseCaseSpy<EntityModel>()
        })
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
        const paramIdName = database.column()
        makeSut(false, paramIdName, {
          checkBusinessRuleUseCase: new CheckBusinessRuleUseCaseSpy<EntityModel>()
        })
        expect(patchSpy).toHaveBeenCalled()
      })

      test('Should call router with correct url', () => {
        const patchSpy = jest.spyOn(RouterSpy, 'patch')
        const paramIdName = database.column()
        makeSut(false, paramIdName, {
          checkBusinessRuleUseCase: new CheckBusinessRuleUseCaseSpy<EntityModel>()
        })
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
})
