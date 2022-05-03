import { makeListEntitiesRoute } from './list-entities.route'
import { DefaultEntity, RepositoryType } from '@/infrastructure/repositories'
import { ExpressRouterSpy } from '@/main/factories/common/mocks'

let RouterSpy: ExpressRouterSpy

jest.mock('express', () => ({
  Router: () => (RouterSpy)
}))

const makeSut = (): void => {
  makeListEntitiesRoute({
    repositoryType: RepositoryType.Memory,
    validRepositoryColumns: [],
    validRequestColumns: [],
    validRepositoryOrders: []
  }, DefaultEntity)
}

describe('makeListEntitiesRoute', () => {
  beforeEach(() => {
    RouterSpy = new ExpressRouterSpy()
  })

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
