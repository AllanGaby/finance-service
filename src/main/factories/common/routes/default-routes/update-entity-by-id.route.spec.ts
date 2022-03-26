import { makeUpdateEntityByIdRoute } from './update-entity-by-id.route'
import { DefaultEntity, RepositoryType } from '@/infrastructure/repositories'
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

const makeSut = (putMethod?: boolean): sutTypes => {
  const fieldsValidation = [
    mockFieldValidationModel(),
    mockFieldValidationModel(),
    mockFieldValidationModel(),
    mockFieldValidationModel()
  ]
  const paramIdName = database.column()
  makeUpdateEntityByIdRoute({
    repositoryType: RepositoryType.Memory
  }, DefaultEntity, paramIdName, database.column(), fieldsValidation, putMethod)
  return {
    paramIdName
  }
}

describe('makeUpdateEntityByIdRoute', () => {
  beforeEach(() => {
    RouterSpy = new ExpressRouterSpy()
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
