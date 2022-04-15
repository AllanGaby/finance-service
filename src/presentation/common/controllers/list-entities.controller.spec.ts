import { ListEntitiesController } from './list-entities.controller'
import { EntityModel, ListEntitiesUseCaseSpy } from '@/domain/common'
import { mockListEntitiesRequest } from '@/presentation/common'
import { HttpHelper } from '@/protocols/http'

type sutTypes = {
  sut: ListEntitiesController<EntityModel>
  listEntitiesUseCase: ListEntitiesUseCaseSpy<EntityModel>
}

const makeSut = (): sutTypes => {
  const listEntitiesUseCase = new ListEntitiesUseCaseSpy()
  const sut = new ListEntitiesController(listEntitiesUseCase)
  return {
    sut,
    listEntitiesUseCase
  }
}

describe('ListEntitiesController', () => {
  test('Should call ListEntitiesUseCase with correct value', async () => {
    const { sut, listEntitiesUseCase } = makeSut()
    const request = mockListEntitiesRequest()
    await sut.handle(request)
    expect(listEntitiesUseCase.filter).toEqual({
      page: request.queryParams.page,
      textToSearch: request.queryParams.search,
      recordsPerPage: request.queryParams.size,
      orderColumn: request.queryParams.order,
      orderDirection: request.queryParams.direction,
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
