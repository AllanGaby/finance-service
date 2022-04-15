import { MapperCustomFiltersMiddleware } from './mapper-custom-filters.middleware'
import { CustomFilterModel, MapperCustomFilterUseCaseSpy, mockCustomFilterConditional, mockCustomFilterModel, mockCustomFilterOperator } from '@/domain/common'
import { HttpHelper, HttpRequest } from '@/protocols/http'
import { ListEntitiesRequest, mockListEntitiesRequest } from '@/presentation/common'
import { datatype } from 'faker'

type sutTypes = {
  sut: MapperCustomFiltersMiddleware
  mapperCustomFilterUseCase: MapperCustomFilterUseCaseSpy
  request: HttpRequest<any, any, ListEntitiesRequest>
}

const makeSut = (): sutTypes => {
  const mapperCustomFilterUseCase = new MapperCustomFilterUseCaseSpy()
  const sut = new MapperCustomFiltersMiddleware(mapperCustomFilterUseCase)
  return {
    sut,
    mapperCustomFilterUseCase,
    request: mockListEntitiesRequest()
  }
}

describe('MapperCustomFiltersMiddleware', () => {
  describe('Call MapperCustomFilterUseCase', () => {
    test('Should call MapperCustomFilterUseCase with correct value if all filters is provided', async () => {
      const { sut, mapperCustomFilterUseCase, request } = makeSut()
      const mapperFiltersSpy = jest.spyOn(mapperCustomFilterUseCase, 'mapperFilters')
      await sut.handle(request)
      const { field, conditional, operator, value } = request.queryParams
      expect(mapperFiltersSpy).toHaveBeenCalledWith({
        fields: field,
        conditionals: conditional,
        operators: operator,
        values: value
      })
    })

    describe('Fields', () => {
      test('Should call MapperCustomFilterUseCase with correct value if field is not provided', async () => {
        const { sut, mapperCustomFilterUseCase, request } = makeSut()
        const mapperFiltersSpy = jest.spyOn(mapperCustomFilterUseCase, 'mapperFilters')
        delete request.queryParams.field
        await sut.handle(request)
        const { conditional, operator, value } = request.queryParams
        expect(mapperFiltersSpy).toHaveBeenCalledWith({
          fields: [],
          conditionals: conditional,
          operators: operator,
          values: value
        })
      })

      test('Should call MapperCustomFilterUseCase with correct value if field is a string', async () => {
        const { sut, mapperCustomFilterUseCase, request } = makeSut()
        const mapperFiltersSpy = jest.spyOn(mapperCustomFilterUseCase, 'mapperFilters')
        request.queryParams.field = datatype.uuid()
        await sut.handle(request)
        const { field, conditional, operator, value } = request.queryParams
        expect(mapperFiltersSpy).toHaveBeenCalledWith({
          fields: [field],
          conditionals: conditional,
          operators: operator,
          values: value
        })
      })
    })

    describe('Conditional', () => {
      test('Should call MapperCustomFilterUseCase with correct value if conditional is not provided', async () => {
        const { sut, mapperCustomFilterUseCase, request } = makeSut()
        const mapperFiltersSpy = jest.spyOn(mapperCustomFilterUseCase, 'mapperFilters')
        delete request.queryParams.conditional
        await sut.handle(request)
        const { field, operator, value } = request.queryParams
        expect(mapperFiltersSpy).toHaveBeenCalledWith({
          fields: field,
          conditionals: [],
          operators: operator,
          values: value
        })
      })

      test('Should call MapperCustomFilterUseCase with correct value if conditional a string', async () => {
        const { sut, mapperCustomFilterUseCase, request } = makeSut()
        const mapperFiltersSpy = jest.spyOn(mapperCustomFilterUseCase, 'mapperFilters')
        request.queryParams.conditional = mockCustomFilterConditional()
        await sut.handle(request)
        const { field, operator, value, conditional } = request.queryParams
        expect(mapperFiltersSpy).toHaveBeenCalledWith({
          fields: field,
          conditionals: [conditional],
          operators: operator,
          values: value
        })
      })
    })

    describe('Operator', () => {
      test('Should call MapperCustomFilterUseCase with correct value if operator is not provided', async () => {
        const { sut, mapperCustomFilterUseCase, request } = makeSut()
        const mapperFiltersSpy = jest.spyOn(mapperCustomFilterUseCase, 'mapperFilters')
        delete request.queryParams.operator
        await sut.handle(request)
        const { field, conditional, value } = request.queryParams
        expect(mapperFiltersSpy).toHaveBeenCalledWith({
          fields: field,
          conditionals: conditional,
          operators: [],
          values: value
        })
      })

      test('Should call MapperCustomFilterUseCase with correct value if operator is a string', async () => {
        const { sut, mapperCustomFilterUseCase, request } = makeSut()
        const mapperFiltersSpy = jest.spyOn(mapperCustomFilterUseCase, 'mapperFilters')
        request.queryParams.operator = mockCustomFilterOperator()
        await sut.handle(request)
        const { field, conditional, value, operator } = request.queryParams
        expect(mapperFiltersSpy).toHaveBeenCalledWith({
          fields: field,
          conditionals: conditional,
          operators: [operator],
          values: value
        })
      })
    })

    describe('Value', () => {
      test('Should call MapperCustomFilterUseCase with correct value if value is not provided', async () => {
        const { sut, mapperCustomFilterUseCase, request } = makeSut()
        const mapperFiltersSpy = jest.spyOn(mapperCustomFilterUseCase, 'mapperFilters')
        delete request.queryParams.value
        await sut.handle(request)
        const { field, operator, conditional } = request.queryParams
        expect(mapperFiltersSpy).toHaveBeenCalledWith({
          fields: field,
          conditionals: conditional,
          operators: operator,
          values: []
        })
      })

      test('Should call MapperCustomFilterUseCase with correct value if value is a string', async () => {
        const { sut, mapperCustomFilterUseCase, request } = makeSut()
        const mapperFiltersSpy = jest.spyOn(mapperCustomFilterUseCase, 'mapperFilters')
        request.queryParams.value = datatype.uuid()
        await sut.handle(request)
        const { field, operator, conditional, value } = request.queryParams
        expect(mapperFiltersSpy).toHaveBeenCalledWith({
          fields: field,
          conditionals: conditional,
          operators: operator,
          values: [value]
        })
      })
    })
  })

  describe('Return correct value', () => {
    test('Should return Ok Status Code (200) with correct values', async () => {
      const { sut, request, mapperCustomFilterUseCase } = makeSut()
      const customFilters: CustomFilterModel[] = [
        mockCustomFilterModel(),
        mockCustomFilterModel(),
        mockCustomFilterModel(),
        mockCustomFilterModel()
      ]
      jest.spyOn(mapperCustomFilterUseCase, 'mapperFilters').mockResolvedValue(customFilters)
      const { headers, params, queryParams } = request
      const response = await sut.handle(request)
      expect(response).toEqual(HttpHelper.ok({
        cursom_filters: customFilters
      }, headers, queryParams, params))
    })
  })
})
