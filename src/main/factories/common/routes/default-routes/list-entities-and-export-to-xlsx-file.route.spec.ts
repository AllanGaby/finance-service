import { makeListEntitiesAndExportToXLSXFileRoute } from './list-entities-and-export-to-xlsx-file.route'
import { DefaultEntity, RepositoryType } from '@/infrastructure/repositories'
import { ExpressRouterSpy } from '@/main/factories/common/mocks'
import { database, system } from 'faker'

let RouterSpy: ExpressRouterSpy

jest.mock('express', () => ({
  Router: () => (RouterSpy)
}))

const makeSut = (): void => {
  makeListEntitiesAndExportToXLSXFileRoute({
    repositoryType: RepositoryType.Memory,
    entityName: database.collation(),
    logoFilePath: system.filePath(),
    validColumnsToExport: {},
    validRepositoryColumns: [],
    validRequestColumns: [],
    validRepositoryOrders: []
  }, DefaultEntity)
}

describe('makeListEntitiesAndExportToXLSXFileRoute', () => {
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
      '/xlsx/:columns',
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
      expect.any(Function)
    )
  })
})
