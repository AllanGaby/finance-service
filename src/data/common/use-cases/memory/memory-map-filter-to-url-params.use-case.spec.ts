import { MemoryMapFilterToURLParamsUseCase } from './memory-map-filter-to-url-params.use-case'
import { ListEntitiesDTO, mockCustomFilterModel, mockListEntitiesDTO, mockListOrderModel } from '@/domain/common'
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
    test('Should not container order params if order is not provided', async () => {
      const { sut, dto } = makeSut()
      delete dto.order
      const urlParams = sut.map(dto)
      expect(urlParams).not.toContain('order=')
    })

    test('Should not container direction params if order is not provided', async () => {
      const { sut, dto } = makeSut()
      delete dto.order
      const urlParams = sut.map(dto)
      expect(urlParams).not.toContain('direction=')
    })

    test('Should container correct order params if order is provided', async () => {
      const { sut, dto } = makeSut()
      dto.order = mockListOrderModel()
      const urlParams = sut.map(dto)
      Object.keys(dto.order).forEach(field => expect(urlParams).toContain(`order=${field}`))
    })

    test('Should container correct direction params if order is provided', async () => {
      const { sut, dto } = makeSut()
      dto.order = mockListOrderModel()
      const urlParams = sut.map(dto)
      Object.keys(dto.order).forEach(field => expect(urlParams).toContain(`direction=${dto.order[field]}`))
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
    test('Should not container field params if filters is not provided', async () => {
      const { sut, dto } = makeSut()
      delete dto.filters
      const urlParams = sut.map(dto)
      expect(urlParams).not.toContain('field=')
    })

    test('Should container correct field params if filters is provided', async () => {
      const { sut, dto } = makeSut()
      dto.filters = [
        mockCustomFilterModel(),
        mockCustomFilterModel(),
        mockCustomFilterModel()
      ]
      const urlParams = sut.map(dto)
      dto.filters.forEach(item => expect(urlParams).toContain(`field=${item.field}`))
    })

    test('Should container correct conditional params if filters is provided', async () => {
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
          expect(urlParams).toContain(`conditional=${item.conditional}`)
        }
      })
    })

    test('Should container correct value params if filters is provided', async () => {
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
          expect(urlParams).toContain(`value=${item.value.toString()}`)
        }
      })
    })

    test('Should container correct operator params if filters is provided', async () => {
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
          expect(urlParams).toContain(`operator=${item.operator}`)
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
