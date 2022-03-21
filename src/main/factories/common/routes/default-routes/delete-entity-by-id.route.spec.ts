import { makeDeleteEntityByIdRoute } from './delete-entity-by-id.route'
import { DefaultEntity, RepositoryType } from '@/infrastructure/repositories'
import { ExpressRouterSpy } from '@/main/factories/common/mocks'
import { database } from 'faker'

let RouterSpy: ExpressRouterSpy

jest.mock('express', () => ({
  Router: () => (RouterSpy)
}))

type sutTypes = {
  paramName: string
}

const makeSut = (): sutTypes => {
  const paramName = database.column()
  makeDeleteEntityByIdRoute({
    repositoryType: RepositoryType.Memory
  }, DefaultEntity, paramName)
  return {
    paramName
  }
}

describe('makeDeleteEntityByIdRoute', () => {
  beforeEach(() => {
    RouterSpy = new ExpressRouterSpy()
  })

  test('Should call router with correct http method', () => {
    const deleteSpy = jest.spyOn(RouterSpy, 'delete')
    makeSut()
    expect(deleteSpy).toHaveBeenCalled()
  })

  test('Should call router with correct url', () => {
    const deleteSpy = jest.spyOn(RouterSpy, 'delete')
    const { paramName } = makeSut()
    expect(deleteSpy).toHaveBeenCalledWith(
      `/:${paramName}`,
      expect.any(Function),
      expect.any(Function)
    )
  })
})
