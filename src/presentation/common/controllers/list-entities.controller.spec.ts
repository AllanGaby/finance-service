import { ListEntitiesController } from './list-entities.controller'
import { EntityModel, ListEntitiesUseCaseSpy, MapperCustomFilterUseCaseSpy, mockCustomFilterConditional, mockCustomFilterOperator } from '@/domain/common'
import { mockListEntitiesRequest } from '@/presentation/common/mocks'
import { HttpHelper } from '@/protocols/http'
import { datatype } from 'faker'

type sutTypes = {
  sut: ListEntitiesController<EntityModel>
  MapperCustomFilterUseCase: MapperCustomFilterUseCaseSpy
  listEntitiesUseCase: ListEntitiesUseCaseSpy<EntityModel>
}

const makeSut = (): sutTypes => {
  const listEntitiesUseCase = new ListEntitiesUseCaseSpy()
  const MapperCustomFilterUseCase = new MapperCustomFilterUseCaseSpy()
  const sut = new ListEntitiesController(MapperCustomFilterUseCase, listEntitiesUseCase)
  return {
    sut,
    MapperCustomFilterUseCase,
    listEntitiesUseCase
  }
}

describe('ListEntitiesController', () => {
  describe('Call MapperCustomFilterUseCase', () => {
    test('Should call MapperCustomFilterUseCase with correct value if all filters is provided', async () => {
      const { sut, MapperCustomFilterUseCase } = makeSut()
      const request = mockListEntitiesRequest()
      await sut.handle(request)
      const { field, conditional, operator, value } = request.queryParams
      expect(MapperCustomFilterUseCase.params).toEqual({
        fields: field,
        conditionals: conditional,
        operators: operator,
        values: value
      })
    })

    describe('Fields', () => {
      test('Should call MapperCustomFilterUseCase with correct value if field is not provided', async () => {
        const { sut, MapperCustomFilterUseCase } = makeSut()
        const request = mockListEntitiesRequest()
        delete request.queryParams.field
        await sut.handle(request)
        const { conditional, operator, value } = request.queryParams
        expect(MapperCustomFilterUseCase.params).toEqual({
          fields: [],
          conditionals: conditional,
          operators: operator,
          values: value
        })
      })

      test('Should call MapperCustomFilterUseCase with correct value if field is a string', async () => {
        const { sut, MapperCustomFilterUseCase } = makeSut()
        const request = mockListEntitiesRequest()
        request.queryParams.field = datatype.uuid()
        await sut.handle(request)
        const { field, conditional, operator, value } = request.queryParams
        expect(MapperCustomFilterUseCase.params).toEqual({
          fields: [field],
          conditionals: conditional,
          operators: operator,
          values: value
        })
      })
    })

    describe('Conditional', () => {
      test('Should call MapperCustomFilterUseCase with correct value if conditional is not provided', async () => {
        const { sut, MapperCustomFilterUseCase } = makeSut()
        const request = mockListEntitiesRequest()
        delete request.queryParams.conditional
        await sut.handle(request)
        const { field, operator, value } = request.queryParams
        expect(MapperCustomFilterUseCase.params).toEqual({
          fields: field,
          conditionals: [],
          operators: operator,
          values: value
        })
      })

      test('Should call MapperCustomFilterUseCase with correct value if conditional a string', async () => {
        const { sut, MapperCustomFilterUseCase } = makeSut()
        const request = mockListEntitiesRequest()
        request.queryParams.conditional = mockCustomFilterConditional()
        await sut.handle(request)
        const { field, operator, value, conditional } = request.queryParams
        expect(MapperCustomFilterUseCase.params).toEqual({
          fields: field,
          conditionals: [conditional],
          operators: operator,
          values: value
        })
      })
    })

    describe('Operator', () => {
      test('Should call MapperCustomFilterUseCase with correct value if operator is not provided', async () => {
        const { sut, MapperCustomFilterUseCase } = makeSut()
        const request = mockListEntitiesRequest()
        delete request.queryParams.operator
        await sut.handle(request)
        const { field, conditional, value } = request.queryParams
        expect(MapperCustomFilterUseCase.params).toEqual({
          fields: field,
          conditionals: conditional,
          operators: [],
          values: value
        })
      })

      test('Should call MapperCustomFilterUseCase with correct value if operator is a string', async () => {
        const { sut, MapperCustomFilterUseCase } = makeSut()
        const request = mockListEntitiesRequest()
        request.queryParams.operator = mockCustomFilterOperator()
        await sut.handle(request)
        const { field, conditional, value, operator } = request.queryParams
        expect(MapperCustomFilterUseCase.params).toEqual({
          fields: field,
          conditionals: conditional,
          operators: [operator],
          values: value
        })
      })
    })

    describe('Value', () => {
      test('Should call MapperCustomFilterUseCase with correct value if value is not provided', async () => {
        const { sut, MapperCustomFilterUseCase } = makeSut()
        const request = mockListEntitiesRequest()
        delete request.queryParams.value
        await sut.handle(request)
        const { field, operator, conditional } = request.queryParams
        expect(MapperCustomFilterUseCase.params).toEqual({
          fields: field,
          conditionals: conditional,
          operators: operator,
          values: []
        })
      })

      test('Should call MapperCustomFilterUseCase with correct value if value is a string', async () => {
        const { sut, MapperCustomFilterUseCase } = makeSut()
        const request = mockListEntitiesRequest()
        request.queryParams.value = datatype.uuid()
        await sut.handle(request)
        const { field, operator, conditional, value } = request.queryParams
        expect(MapperCustomFilterUseCase.params).toEqual({
          fields: field,
          conditionals: conditional,
          operators: operator,
          values: [value]
        })
      })
    })
  })

  test('Should call ListEntitiesUseCase with correct value', async () => {
    const { sut, listEntitiesUseCase, MapperCustomFilterUseCase } = makeSut()
    const request = mockListEntitiesRequest()
    await sut.handle(request)
    expect(listEntitiesUseCase.filter).toEqual({
      page: request.queryParams.page,
      textToSearch: request.queryParams.search,
      recordsPerPage: request.queryParams.size,
      orderColumn: request.queryParams.order,
      orderDirection: request.queryParams.direction,
      filters: MapperCustomFilterUseCase.filters
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
