import { ListEntitiesAndExportToFileController } from './list-entities-and-export-to-file.controller'
import { EntityModel, ListEntitiesAndExportToFileUseCaseSpy } from '@/domain/common'
import { ExportEntitiesToFileRequest, CustomFiltersRequest, ListEntitiesRequest, mockExportEntitiesToFileRequest } from '@/presentation/common'
import { HttpContentType, HttpHelper, HttpRequest } from '@/protocols/http'
import { datatype } from 'faker'

type sutTypes = {
  sut: ListEntitiesAndExportToFileController<EntityModel>
  listEntitiesAndExportToFileUseCase: ListEntitiesAndExportToFileUseCaseSpy<EntityModel>
  request: HttpRequest<CustomFiltersRequest, any, ListEntitiesRequest, ExportEntitiesToFileRequest>
}

const makeSut = (): sutTypes => {
  const listEntitiesAndExportToFileUseCase = new ListEntitiesAndExportToFileUseCaseSpy<EntityModel>()
  const sut = new ListEntitiesAndExportToFileController(listEntitiesAndExportToFileUseCase)
  return {
    sut,
    listEntitiesAndExportToFileUseCase,
    request: mockExportEntitiesToFileRequest()
  }
}

describe('ListEntitiesAndExportToFileController', () => {
  test('Should call listEntitiesAndExportToFileUseCase with correct value', async () => {
    const { sut, listEntitiesAndExportToFileUseCase, request } = makeSut()
    await sut.handle(request)
    expect(listEntitiesAndExportToFileUseCase.filter).toEqual({
      columns: request.params.columns.split(','),
      page: request.queryParams.page,
      textToSearch: request.queryParams.search,
      recordsPerPage: request.queryParams.size,
      order: request.body.orders,
      filters: request.body.custom_filters
    })
  })

  test('Should fails if listEntitiesAndExportToFileUseCase fails', async () => {
    const { sut, listEntitiesAndExportToFileUseCase, request } = makeSut()
    jest.spyOn(listEntitiesAndExportToFileUseCase, 'listAndExport').mockRejectedValue(new Error())
    const promise = sut.handle(request)
    await expect(promise).rejects.toThrow()
  })

  test('Should return exportFile if listEntitiesAndExportToFileUseCase is succeeds', async () => {
    const { sut, listEntitiesAndExportToFileUseCase, request } = makeSut()
    const fileContent = Buffer.from(datatype.string())
    jest.spyOn(listEntitiesAndExportToFileUseCase, 'listAndExport').mockResolvedValue(fileContent)
    const response = await sut.handle(request)
    expect(response).toEqual(HttpHelper.exportFile({
      contentType: HttpContentType.xlsx,
      fileContent
    }))
  })
})
