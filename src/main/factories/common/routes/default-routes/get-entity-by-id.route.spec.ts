import { makeGetEntityByIdRoute } from './get-entity-by-id.route'
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
  makeGetEntityByIdRoute({
    repositoryType: RepositoryType.Memory
  }, DefaultEntity, paramName, database.column())
  return {
    paramName
  }
}

describe('makeGetEntityByIdRoute', () => {
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
    const { paramName } = makeSut()
    expect(getSpy).toHaveBeenCalledWith(
      `/:${paramName}`,
      expect.any(Function),
      expect.any(Function)
    )
  })
})
