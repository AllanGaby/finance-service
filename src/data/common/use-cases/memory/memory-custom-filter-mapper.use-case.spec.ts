import { MemoryCustomFilterMapperUseCase } from './memory-custom-filter-mapper.use-case'
import { CustomFilterConditional, CustomFilterOperator, mockCustomFilterMapperDTO } from '@/domain/common'
import { database, random } from 'faker'

type sutTypes = {
  sut: MemoryCustomFilterMapperUseCase
  validParamsColumns: string[]
  validRepositoryColumns: string[]
}

const makeSut = (): sutTypes => {
  const validParamsColumns = [
    database.column(),
    database.column(),
    database.column()
  ]
  const validRepositoryColumns = [
    database.column(),
    database.column(),
    database.column()
  ]
  const sut = new MemoryCustomFilterMapperUseCase(validParamsColumns, validRepositoryColumns)
  return {
    sut,
    validParamsColumns,
    validRepositoryColumns
  }
}

describe('MemoryCustomFilterMapperUseCase', () => {
  describe('Fields', () => {
    test('Should return a empty filter if f is not provided', async () => {
      const { sut } = makeSut()
      const request = mockCustomFilterMapperDTO()
      delete request.fields
      const filter = await sut.getFilters(request)
      expect(filter).toEqual([])
    })

    test('Should return a empty filter if f is empty list', async () => {
      const { sut } = makeSut()
      const request = mockCustomFilterMapperDTO()
      request.fields = []
      const filter = await sut.getFilters(request)
      expect(filter).toEqual([])
    })

    test('Should return a filter list with same if f length if all fields are valids', async () => {
      const { sut, validParamsColumns } = makeSut()
      const request = mockCustomFilterMapperDTO()
      for (let index: number = 0; index < request.fields.length; index++) {
        request.fields[index] = random.arrayElement(validParamsColumns)
      }
      const filter = await sut.getFilters(request)
      expect(filter).toHaveLength(request.fields.length)
    })
  })

  describe('Operators', () => {
    test('Should use and operator if o is not provided', async () => {
      const { sut } = makeSut()
      const request = mockCustomFilterMapperDTO()
      delete request.operators
      const filters = await sut.getFilters(request)
      filters.forEach(filter => {
        expect(filter.operator).toBe(CustomFilterOperator.and)
      })
    })

    test('Should use and operator if o is empty list', async () => {
      const { sut } = makeSut()
      const request = mockCustomFilterMapperDTO()
      request.operators = []
      const filters = await sut.getFilters(request)
      filters.forEach(filter => {
        expect(filter.operator).toBe(CustomFilterOperator.and)
      })
    })
  })

  describe('Conditionals', () => {
    test('Should use equal conditional if c is not provided', async () => {
      const { sut } = makeSut()
      const request = mockCustomFilterMapperDTO()
      delete request.conditionals
      const filters = await sut.getFilters(request)
      filters.forEach(filter => {
        expect(filter.conditional).toBe(CustomFilterConditional.equal)
      })
    })

    test('Should use equal conditional if c is empty list', async () => {
      const { sut } = makeSut()
      const request = mockCustomFilterMapperDTO()
      request.conditionals = []
      const filters = await sut.getFilters(request)
      filters.forEach(filter => {
        expect(filter.conditional).toBe(CustomFilterConditional.equal)
      })
    })
  })

  describe('Values', () => {
    test('Should use undefined value if v is not provided', async () => {
      const { sut } = makeSut()
      const request = mockCustomFilterMapperDTO()
      delete request.values
      const filters = await sut.getFilters(request)
      filters.forEach(filter => {
        expect(filter.value).toBe(undefined)
      })
    })

    test('Should use undefined value if v is empty list', async () => {
      const { sut } = makeSut()
      const request = mockCustomFilterMapperDTO()
      request.values = []
      const filters = await sut.getFilters(request)
      filters.forEach(filter => {
        expect(filter.value).toBe(undefined)
      })
    })
  })

  test('Should return a filter list with correct values', async () => {
    const { sut, validParamsColumns, validRepositoryColumns } = makeSut()
    const request = mockCustomFilterMapperDTO()
    for (let index: number = 0; index < request.fields.length; index++) {
      request.fields[index] = random.arrayElement(validParamsColumns)
    }
    const filters = await sut.getFilters(request)
    filters.forEach((filter, index) => {
      const paramColumnIndex = validParamsColumns.indexOf(request.fields[index])
      expect(filter.field).toBe(validRepositoryColumns[paramColumnIndex])
      expect(filter.conditional).toBe(request.conditionals[index])
      expect(filter.operator).toBe(request.operators[index])
      expect(filter.value).toBe(request.values[index])
    })
  })
})
