import { makeGetEntityByIdRoute } from './get-entity-by-id.route'
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

const makeSut = (): sutTypes => {
  const paramIdName = database.column()
  makeGetEntityByIdRoute({
    repositoryType: RepositoryType.Memory
  }, DefaultEntity, paramIdName, database.column())
  return {
    paramIdName
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
    const { paramIdName } = makeSut()
    expect(getSpy).toHaveBeenCalledWith(
      `/:${paramIdName}`,
      expect.any(Function),
      expect.any(Function)
    )
  })
})
