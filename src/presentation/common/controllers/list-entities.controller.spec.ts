import { ListEntitiesController } from './list-entities.controller'
import { EntityModel, ListEntitiesUseCaseSpy } from '@/domain/common'
import { CustomFiltersRequest, ListEntitiesRequest, mockListEntitiesRequest } from '@/presentation/common'
import { HttpHelper, HttpRequest } from '@/protocols/http'

type sutTypes = {
  sut: ListEntitiesController<EntityModel>
  request: HttpRequest<CustomFiltersRequest, any, ListEntitiesRequest>
  listEntitiesUseCase: ListEntitiesUseCaseSpy<EntityModel>
}

const makeSut = (): sutTypes => {
  const listEntitiesUseCase = new ListEntitiesUseCaseSpy()
  const sut = new ListEntitiesController(listEntitiesUseCase)
  return {
    sut,
    request: mockListEntitiesRequest(),
    listEntitiesUseCase
  }
}

describe('ListEntitiesController', () => {
  test('Should call ListEntitiesUseCase with correct value', async () => {
    const { sut, listEntitiesUseCase, request } = makeSut()
    await sut.handle(request)
    expect(listEntitiesUseCase.filter).toEqual({
      page: request.queryParams.page,
      textToSearch: request.queryParams.search,
      recordsPerPage: request.queryParams.size,
      order: request.body.orders,
      filters: request.body.custom_filters
    })
  })

  test('Should fails if ListEntitiesUseCase fails', async () => {
    const { sut, listEntitiesUseCase } = makeSut()
    jest.spyOn(listEntitiesUseCase, 'list').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.handle(mockListEntitiesRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return ok if ListEntitiesUseCase is succeeds', async () => {
    const { sut, listEntitiesUseCase } = makeSut()
    const response = await sut.handle(mockListEntitiesRequest())
    expect(response).toEqual(HttpHelper.ok(listEntitiesUseCase.entities))
  })
})
