import { makeListEntitiesAndExportToXLSXFileWithAuthenticationRoute } from './list-entities-and-export-to-xlsx-file-with-authentication.route'
import { CheckBusinessRuleUseCaseSpy, EntityModel, ListEntitiesAndExportToFileUseCaseSpy } from '@/domain/common'
import { DefaultEntity, RepositoryType } from '@/infrastructure/repositories'
import { CacheType } from '@/infrastructure/cache'
import { ListEntitiesAndExportToFileController } from '@/presentation/common'
import { ExpressRouterSpy } from '@/main/factories/common/mocks'
import { ConfigSetup, ConfigurationModel } from '@/main/application/config'
import { database, datatype, system } from 'faker'

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
  makeListEntitiesAndExportToXLSXFileWithAuthenticationRoute({
    repositoryType: RepositoryType.Memory,
    cacheType: CacheType.Memory,
    logoFilePath: system.filePath(),
    entityName: database.collation(),
    validColumnsToExport: {},
    accessTokenName: database.column(),
    secret: datatype.uuid(),
    privateKey,
    publicKey
  }, DefaultEntity, [], [], [], [],
  params.listEntitiesAndExportToFileController,
  params.checkBusinessRuleUseCase)
}

const config: ConfigurationModel = ConfigSetup()
let privateKey: string
let publicKey: string

describe('makeListEntitiesAndExportToXLSXFileWithAuthenticationRoute', () => {
  beforeEach(() => {
    RouterSpy = new ExpressRouterSpy()
  })

  beforeAll(async () => {
    privateKey = await config.security.getPrivateKey()
    publicKey = await config.security.getPublicKey()
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
        expect.any(Function),
        expect.any(Function)
      )
    })
  })
})
