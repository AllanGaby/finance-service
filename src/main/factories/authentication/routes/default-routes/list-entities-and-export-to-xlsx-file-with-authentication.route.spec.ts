import { makeListEntitiesAndExportToXLSXFileWithAuthenticationRoute } from './list-entities-and-export-to-xlsx-file-with-authentication.route'
import { DefaultEntity, RepositoryType } from '@/infrastructure/repositories'
import { CacheType } from '@/infrastructure/cache'
import { ExpressRouterSpy } from '@/main/factories/common/mocks'
import { ConfigSetup, ConfigurationModel } from '@/main/application/config'
import { database, datatype, system } from 'faker'

let RouterSpy: ExpressRouterSpy

jest.mock('express', () => ({
  Router: () => (RouterSpy)
}))

const makeSut = (): void => {
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
  }, DefaultEntity, [], [], [], [])
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
