import { makeListEntitiesAndExportToXLSXFileRoute } from './list-entities-and-export-to-xlsx-file.route'
import { CheckBusinessRuleUseCaseSpy, EntityModel, ListEntitiesAndExportToFileUseCaseSpy } from '@/domain/common'
import { DefaultEntity, RepositoryType } from '@/infrastructure/repositories'
import { ListEntitiesAndExportToFileController } from '@/presentation/common'
import { ExpressRouterSpy } from '@/main/factories/common/mocks'
import { database, system } from 'faker'

let RouterSpy: ExpressRouterSpy

jest.mock('express', () => ({
  Router: () => (RouterSpy)
}))

type sutDTO = {
  listEntitiesAndExportToFileController?: ListEntitiesAndExportToFileController<EntityModel>
  checkBusinessRuleUseCase?: CheckBusinessRuleUseCaseSpy
}

const makeSut = (params: sutDTO = {
  checkBusinessRuleUseCase: undefined,
  listEntitiesAndExportToFileController: undefined
}): void => {
  makeListEntitiesAndExportToXLSXFileRoute({
    repositoryType: RepositoryType.Memory,
    entityName: database.collation(),
    logoFilePath: system.filePath(),
    validColumnsToExport: {}
  }, DefaultEntity, [], [], [],
  params.listEntitiesAndExportToFileController,
  params.checkBusinessRuleUseCase)
}

describe('makeListEntitiesAndExportToXLSXFileRoute', () => {
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
        '/xlsx/:columns',
        expect.any(Function),
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
        listEntitiesAndExportToFileController: new ListEntitiesAndExportToFileController<EntityModel>(
          new ListEntitiesAndExportToFileUseCaseSpy<EntityModel>()
        )
      })
      expect(getSpy).toHaveBeenCalled()
    })

    test('Should call router with correct url', () => {
      const getSpy = jest.spyOn(RouterSpy, 'get')
      makeSut({
        listEntitiesAndExportToFileController: new ListEntitiesAndExportToFileController<EntityModel>(
          new ListEntitiesAndExportToFileUseCaseSpy<EntityModel>()
        )
      })
      expect(getSpy).toHaveBeenCalledWith(
        '/xlsx/:columns',
        expect.any(Function),
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
        '/xlsx/:columns',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      )
    })
  })
})
