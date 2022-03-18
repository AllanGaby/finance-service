import { MemoryMapperCustomFilterUseCase } from './memory-mapper-custom-filter.use-case'
import { CustomFilterConditional, CustomFilterOperator, mockMapperCustomFilterDTO } from '@/domain/common'
import faker from 'faker'

type sutTypes = {
  sut: MemoryMapperCustomFilterUseCase
  validParamsColumns: string[]
  validRepositoryColumns: string[]
}

const makeSut = (): sutTypes => {
  const validParamsColumns = [
    faker.database.column(),
    faker.database.column(),
    faker.database.column()
  ]
  const validRepositoryColumns = [
    faker.database.column(),
    faker.database.column(),
    faker.database.column()
  ]
  const sut = new MemoryMapperCustomFilterUseCase(validParamsColumns, validRepositoryColumns)
  return {
    sut,
    validParamsColumns,
    validRepositoryColumns
  }
}

describe('MemoryMapperCustomFilterUseCase', () => {
  describe('Fields', () => {
    test('Should return a empty filter if f is not provided', async () => {
      const { sut } = makeSut()
      const request = mockMapperCustomFilterDTO()
      delete request.fields
      const filter = await sut.mapperFilters(request)
      expect(filter).toEqual([])
    })

    test('Should return a empty filter if f is empty list', async () => {
      const { sut } = makeSut()
      const request = mockMapperCustomFilterDTO()
      request.fields = []
      const filter = await sut.mapperFilters(request)
      expect(filter).toEqual([])
    })

    test('Should return a filter list with same if f length if all fields are valids', async () => {
      const { sut, validParamsColumns } = makeSut()
      const request = mockMapperCustomFilterDTO()
      for (let index: number = 0; index < request.fields.length; index++) {
        request.fields[index] = faker.random.arrayElement(validParamsColumns)
      }
      const filter = await sut.mapperFilters(request)
      expect(filter).toHaveLength(request.fields.length)
    })
  })

  describe('Operators', () => {
    test('Should use and operator if o is not provided', async () => {
      const { sut } = makeSut()
      const request = mockMapperCustomFilterDTO()
      delete request.operators
      const filters = await sut.mapperFilters(request)
      filters.forEach(filter => {
        expect(filter.operator).toBe(CustomFilterOperator.and)
      })
    })

    test('Should use and operator if o is empty list', async () => {
      const { sut } = makeSut()
      const request = mockMapperCustomFilterDTO()
      request.operators = []
      const filters = await sut.mapperFilters(request)
      filters.forEach(filter => {
        expect(filter.operator).toBe(CustomFilterOperator.and)
      })
    })
  })

  describe('Conditionals', () => {
    test('Should use equal conditional if c is not provided', async () => {
      const { sut } = makeSut()
      const request = mockMapperCustomFilterDTO()
      delete request.conditionals
      const filters = await sut.mapperFilters(request)
      filters.forEach(filter => {
        expect(filter.conditional).toBe(CustomFilterConditional.equal)
      })
    })

    test('Should use equal conditional if c is empty list', async () => {
      const { sut } = makeSut()
      const request = mockMapperCustomFilterDTO()
      request.conditionals = []
      const filters = await sut.mapperFilters(request)
      filters.forEach(filter => {
        expect(filter.conditional).toBe(CustomFilterConditional.equal)
      })
    })
  })

  describe('Values', () => {
    test('Should use undefined value if v is not provided', async () => {
      const { sut } = makeSut()
      const request = mockMapperCustomFilterDTO()
      delete request.values
      const filters = await sut.mapperFilters(request)
      filters.forEach(filter => {
        expect(filter.value).toBe(undefined)
      })
    })

    test('Should use undefined value if v is empty list', async () => {
      const { sut } = makeSut()
      const request = mockMapperCustomFilterDTO()
      request.values = []
      const filters = await sut.mapperFilters(request)
      filters.forEach(filter => {
        expect(filter.value).toBe(undefined)
      })
    })
  })

  test('Should return a filter list with correct values', async () => {
    const { sut, validParamsColumns, validRepositoryColumns } = makeSut()
    const request = mockMapperCustomFilterDTO()
    for (let index: number = 0; index < request.fields.length; index++) {
      request.fields[index] = faker.random.arrayElement(validParamsColumns)
    }
    const filters = await sut.mapperFilters(request)
    filters.forEach((filter, index) => {
      const paramColumnIndex = validParamsColumns.indexOf(request.fields[index])
      expect(filter.field).toBe(validRepositoryColumns[paramColumnIndex])
      expect(filter.conditional).toBe(request.conditionals[index])
      expect(filter.operator).toBe(request.operators[index])
      expect(filter.value).toBe(request.values[index])
    })
  })
})
