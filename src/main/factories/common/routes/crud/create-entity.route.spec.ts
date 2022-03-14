import { makeCreateEntityRoute } from './create-entity.route'
import { mockFieldValidationModel } from '@/protocols/request-validator'
import { DefaultEntity, RepositoryType } from '@/infrastructure/repositories'
import { ExpressRouterSpy } from '@/main/factories/common/mocks'

let RouterSpy: ExpressRouterSpy

jest.mock('express', () => ({
  Router: () => (RouterSpy)
}))

const makeSut = (): void => {
  const fieldsValidation = [
    mockFieldValidationModel(),
    mockFieldValidationModel(),
    mockFieldValidationModel(),
    mockFieldValidationModel()
  ]
  makeCreateEntityRoute({
    repositoryType: RepositoryType.Memory
  }, DefaultEntity, fieldsValidation)
}

describe('makeCreateEntityRoute', () => {
  beforeEach(() => {
    RouterSpy = new ExpressRouterSpy()
  })

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
