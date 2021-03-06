import { CustomFiltersMapperMiddleware } from './custom-filters-mapper.middleware'
import { CustomFilterModel, CustomFilterMapperUseCaseSpy, mockCustomFilterConditional, mockCustomFilterModel, mockCustomFilterOperator } from '@/domain/common'
import { HttpHelper, HttpRequest } from '@/protocols/http'
import { ListEntitiesRequest, mockListEntitiesRequest } from '@/presentation/common'
import { datatype } from 'faker'

type sutTypes = {
  sut: CustomFiltersMapperMiddleware
  customFilterMapperUseCase: CustomFilterMapperUseCaseSpy
  request: HttpRequest<any, any, ListEntitiesRequest>
}

const makeSut = (): sutTypes => {
  const customFilterMapperUseCase = new CustomFilterMapperUseCaseSpy()
  const sut = new CustomFiltersMapperMiddleware(customFilterMapperUseCase)
  return {
    sut,
    customFilterMapperUseCase,
    request: mockListEntitiesRequest()
  }
}

describe('CustomFiltersMapperMiddleware', () => {
  describe('Call CustomFilterMapperUseCase', () => {
    test('Should call CustomFilterMapperUseCase with correct value if all filters is provided', async () => {
      const { sut, customFilterMapperUseCase, request } = makeSut()
      const getFiltersSpy = jest.spyOn(customFilterMapperUseCase, 'getFilters')
      await sut.handle(request)
      const { field, conditional, operator, value } = request.queryParams
      expect(getFiltersSpy).toHaveBeenCalledWith({
        fields: field,
        conditionals: conditional,
        operators: operator,
        values: value
      })
    })

    describe('Fields', () => {
      test('Should call CustomFilterMapperUseCase with correct value if field is not provided', async () => {
        const { sut, customFilterMapperUseCase, request } = makeSut()
        const getFiltersSpy = jest.spyOn(customFilterMapperUseCase, 'getFilters')
        delete request.queryParams.field
        await sut.handle(request)
        const { conditional, operator, value } = request.queryParams
        expect(getFiltersSpy).toHaveBeenCalledWith({
          fields: [],
          conditionals: conditional,
          operators: operator,
          values: value
        })
      })

      test('Should call CustomFilterMapperUseCase with correct value if field is a string', async () => {
        const { sut, customFilterMapperUseCase, request } = makeSut()
        const getFiltersSpy = jest.spyOn(customFilterMapperUseCase, 'getFilters')
        request.queryParams.field = datatype.uuid()
        await sut.handle(request)
        const { field, conditional, operator, value } = request.queryParams
        expect(getFiltersSpy).toHaveBeenCalledWith({
          fields: [field],
          conditionals: conditional,
          operators: operator,
          values: value
        })
      })
    })

    describe('Conditional', () => {
      test('Should call CustomFilterMapperUseCase with correct value if conditional is not provided', async () => {
        const { sut, customFilterMapperUseCase, request } = makeSut()
        const getFiltersSpy = jest.spyOn(customFilterMapperUseCase, 'getFilters')
        delete request.queryParams.conditional
        await sut.handle(request)
        const { field, operator, value } = request.queryParams
        expect(getFiltersSpy).toHaveBeenCalledWith({
          fields: field,
          conditionals: [],
          operators: operator,
          values: value
        })
      })

      test('Should call CustomFilterMapperUseCase with correct value if conditional a string', async () => {
        const { sut, customFilterMapperUseCase, request } = makeSut()
        const getFiltersSpy = jest.spyOn(customFilterMapperUseCase, 'getFilters')
        request.queryParams.conditional = mockCustomFilterConditional()
        await sut.handle(request)
        const { field, operator, value, conditional } = request.queryParams
        expect(getFiltersSpy).toHaveBeenCalledWith({
          fields: field,
          conditionals: [conditional],
          operators: operator,
          values: value
        })
      })
    })

    describe('Operator', () => {
      test('Should call CustomFilterMapperUseCase with correct value if operator is not provided', async () => {
        const { sut, customFilterMapperUseCase, request } = makeSut()
        const getFiltersSpy = jest.spyOn(customFilterMapperUseCase, 'getFilters')
        delete request.queryParams.operator
        await sut.handle(request)
        const { field, conditional, value } = request.queryParams
        expect(getFiltersSpy).toHaveBeenCalledWith({
          fields: field,
          conditionals: conditional,
          operators: [],
          values: value
        })
      })

      test('Should call CustomFilterMapperUseCase with correct value if operator is a string', async () => {
        const { sut, customFilterMapperUseCase, request } = makeSut()
        const getFiltersSpy = jest.spyOn(customFilterMapperUseCase, 'getFilters')
        request.queryParams.operator = mockCustomFilterOperator()
        await sut.handle(request)
        const { field, conditional, value, operator } = request.queryParams
        expect(getFiltersSpy).toHaveBeenCalledWith({
          fields: field,
          conditionals: conditional,
          operators: [operator],
          values: value
        })
      })
    })

    describe('Value', () => {
      test('Should call CustomFilterMapperUseCase with correct value if value is not provided', async () => {
        const { sut, customFilterMapperUseCase, request } = makeSut()
        const getFiltersSpy = jest.spyOn(customFilterMapperUseCase, 'getFilters')
        delete request.queryParams.value
        await sut.handle(request)
        const { field, operator, conditional } = request.queryParams
        expect(getFiltersSpy).toHaveBeenCalledWith({
          fields: field,
          conditionals: conditional,
          operators: operator,
          values: []
        })
      })

      test('Should call CustomFilterMapperUseCase with correct value if value is a string', async () => {
        const { sut, customFilterMapperUseCase, request } = makeSut()
        const getFiltersSpy = jest.spyOn(customFilterMapperUseCase, 'getFilters')
        request.queryParams.value = datatype.uuid()
        await sut.handle(request)
        const { field, operator, conditional, value } = request.queryParams
        expect(getFiltersSpy).toHaveBeenCalledWith({
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
      const { sut, request, customFilterMapperUseCase } = makeSut()
      const customFilters: CustomFilterModel[] = [
        mockCustomFilterModel(),
        mockCustomFilterModel(),
        mockCustomFilterModel(),
        mockCustomFilterModel()
      ]
      jest.spyOn(customFilterMapperUseCase, 'getFilters').mockResolvedValue(customFilters)
      const { body, headers, params, queryParams } = request
      const response = await sut.handle(request)
      expect(response).toEqual(HttpHelper.ok({
        ...body,
        custom_filters: customFilters
      }, headers, queryParams, params))
    })
  })
})
