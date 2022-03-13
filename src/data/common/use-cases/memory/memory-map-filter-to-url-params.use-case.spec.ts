import { MemoryMapFilterToURLParamsUseCase } from './memory-map-filter-to-url-params.use-case'
import { ListEntitiesDTO, mockCustomFilterModel, mockListEntitiesDTO, mockOrderDirection } from '@/domain/common'
import { datatype } from 'faker'

type sutTypes = {
  sut: MemoryMapFilterToURLParamsUseCase
  dto: ListEntitiesDTO
}

const makeSut = (): sutTypes => ({
  sut: new MemoryMapFilterToURLParamsUseCase(),
  dto: mockListEntitiesDTO()
})

describe('MemoryMapFilterToURLParamsUseCase', () => {
  describe('Search', () => {
    test('Should return search param if textToSearch is provided', () => {
      const { sut, dto } = makeSut()
      dto.textToSearch = datatype.uuid()
      const urlParams = sut.map(dto)
      expect(urlParams).toContain(`search=${dto.textToSearch}`)
    })

    test('Should not return search param if textToSearch is not provided', () => {
      const { sut, dto } = makeSut()
      delete dto.textToSearch
      const urlParams = sut.map(dto)
      expect(urlParams).not.toContain('search=')
    })
  })

  describe('Order', () => {
    test('Should return order param if orderColumn is provided', () => {
      const { sut, dto } = makeSut()
      dto.orderColumn = datatype.uuid()
      const urlParams = sut.map(dto)
      expect(urlParams).toContain(`order=${dto.orderColumn}`)
    })

    test('Should not return order param if orderColumn is not provided', () => {
      const { sut, dto } = makeSut()
      delete dto.orderColumn
      const urlParams = sut.map(dto)
      expect(urlParams).not.toContain('order=')
    })
  })

  describe('Direction', () => {
    test('Should return direction param if orderDirection is provided', () => {
      const { sut, dto } = makeSut()
      dto.orderDirection = mockOrderDirection()
      const urlParams = sut.map(dto)
      expect(urlParams).toContain(`direction=${dto.orderDirection}`)
    })

    test('Should not return direction param if orderDirection is not provided', () => {
      const { sut, dto } = makeSut()
      delete dto.orderDirection
      const urlParams = sut.map(dto)
      expect(urlParams).not.toContain('direction=')
    })
  })

  describe('Size', () => {
    test('Should return size param if recordsPerPage is provided', () => {
      const { sut, dto } = makeSut()
      dto.recordsPerPage = datatype.number()
      const urlParams = sut.map(dto)
      expect(urlParams).toContain(`size=${dto.recordsPerPage}`)
    })

    test('Should not return size param if recordsPerPage is not provided', () => {
      const { sut, dto } = makeSut()
      delete dto.recordsPerPage
      const urlParams = sut.map(dto)
      expect(urlParams).not.toContain('size=')
    })
  })

  describe('Page', () => {
    test('Should return page param if page is provided', () => {
      const { sut, dto } = makeSut()
      dto.page = datatype.number()
      const urlParams = sut.map(dto)
      expect(urlParams).toContain(`page=${dto.page}`)
    })

    test('Should not return page param if page is not provided', () => {
      const { sut, dto } = makeSut()
      delete dto.page
      const urlParams = sut.map(dto)
      expect(urlParams).not.toContain('page=')
    })
  })

  describe('Filters', () => {
    test('Should not container f params if filters is not provided', async () => {
      const { sut, dto } = makeSut()
      delete dto.filters
      const urlParams = sut.map(dto)
      expect(urlParams).not.toContain('f=')
    })

    test('Should container correct f params if filters is provided', async () => {
      const { sut, dto } = makeSut()
      dto.filters = [
        mockCustomFilterModel(),
        mockCustomFilterModel(),
        mockCustomFilterModel()
      ]
      const urlParams = sut.map(dto)
      dto.filters.forEach(item => expect(urlParams).toContain(`f=${item.field}`))
    })

    test('Should container correct c params if filters is provided', async () => {
      const { sut, dto } = makeSut()
      const customFilterWithoutConditional = mockCustomFilterModel()
      delete customFilterWithoutConditional.conditional
      dto.filters = [
        mockCustomFilterModel(),
        customFilterWithoutConditional,
        mockCustomFilterModel(),
        mockCustomFilterModel()
      ]
      const urlParams = sut.map(dto)
      dto.filters.forEach(item => {
        if (item.conditional) {
          expect(urlParams).toContain(`c=${item.conditional}`)
        }
      })
    })

    test('Should container correct v params if filters is provided', async () => {
      const { sut, dto } = makeSut()
      const customFilterWithoutValue = mockCustomFilterModel()
      delete customFilterWithoutValue.value
      dto.filters = [
        mockCustomFilterModel(),
        customFilterWithoutValue,
        mockCustomFilterModel(),
        mockCustomFilterModel()
      ]
      const urlParams = sut.map(dto)
      dto.filters.forEach(item => {
        if (item.value) {
          expect(urlParams).toContain(`v=${item.value.toString()}`)
        }
      })
    })

    test('Should container correct o params if filters is provided', async () => {
      const { sut, dto } = makeSut()
      const customFilterWithoutOperator = mockCustomFilterModel()
      delete customFilterWithoutOperator.operator
      dto.filters = [
        mockCustomFilterModel(),
        customFilterWithoutOperator,
        mockCustomFilterModel(),
        mockCustomFilterModel()
      ]
      const urlParams = sut.map(dto)
      dto.filters.forEach(item => {
        if (item.operator) {
          expect(urlParams).toContain(`o=${item.operator}`)
        }
      })
    })
  })

  describe('Return', () => {
    test('Should return URLParams started with ? if any filter is provided', async () => {
      const { sut, dto } = makeSut()
      const urlParams = sut.map(dto)
      expect(urlParams[0]).toBe('?')
    })

    test('Should return empty string if filter is undefined', () => {
      const { sut } = makeSut()
      const urlParams = sut.map(undefined)
      expect(urlParams).toBeFalsy()
    })
  })
})
