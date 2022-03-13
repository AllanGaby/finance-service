import { MemoryGetCustomFilterUseCase } from './memory-get-custom-filter.use-case'
import { CustomFilterConditional, CustomFilterOperator, mockGetCustomFilterDTO } from '@/domain/common'
import faker from 'faker'

type sutTypes = {
  sut: MemoryGetCustomFilterUseCase
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
  const sut = new MemoryGetCustomFilterUseCase(validParamsColumns, validRepositoryColumns)
  return {
    sut,
    validParamsColumns,
    validRepositoryColumns
  }
}

describe('MemoryGetCustomFilterUseCase', () => {
  describe('Fields', () => {
    test('Should return a empty filter if f is not provided', async () => {
      const { sut } = makeSut()
      const request = mockGetCustomFilterDTO()
      delete request.f
      const filter = await sut.getFilter(request)
      expect(filter).toEqual([])
    })

    test('Should return a empty filter if f is empty list', async () => {
      const { sut } = makeSut()
      const request = mockGetCustomFilterDTO()
      request.f = []
      const filter = await sut.getFilter(request)
      expect(filter).toEqual([])
    })

    test('Should return a filter list with same if f length if all fields are valids', async () => {
      const { sut, validParamsColumns } = makeSut()
      const request = mockGetCustomFilterDTO()
      for (let index: number = 0; index < request.f.length; index++) {
        request.f[index] = faker.random.arrayElement(validParamsColumns)
      }
      const filter = await sut.getFilter(request)
      expect(filter).toHaveLength(request.f.length)
    })
  })

  describe('Operators', () => {
    test('Should use and operator if o is not provided', async () => {
      const { sut } = makeSut()
      const request = mockGetCustomFilterDTO()
      delete request.o
      const filters = await sut.getFilter(request)
      filters.forEach(filter => {
        expect(filter.operator).toBe(CustomFilterOperator.and)
      })
    })

    test('Should use and operator if o is empty list', async () => {
      const { sut } = makeSut()
      const request = mockGetCustomFilterDTO()
      request.o = []
      const filters = await sut.getFilter(request)
      filters.forEach(filter => {
        expect(filter.operator).toBe(CustomFilterOperator.and)
      })
    })
  })

  describe('Conditionals', () => {
    test('Should use equal conditional if c is not provided', async () => {
      const { sut } = makeSut()
      const request = mockGetCustomFilterDTO()
      delete request.c
      const filters = await sut.getFilter(request)
      filters.forEach(filter => {
        expect(filter.conditional).toBe(CustomFilterConditional.equal)
      })
    })

    test('Should use equal conditional if c is empty list', async () => {
      const { sut } = makeSut()
      const request = mockGetCustomFilterDTO()
      request.c = []
      const filters = await sut.getFilter(request)
      filters.forEach(filter => {
        expect(filter.conditional).toBe(CustomFilterConditional.equal)
      })
    })
  })

  describe('Values', () => {
    test('Should use undefined value if v is not provided', async () => {
      const { sut } = makeSut()
      const request = mockGetCustomFilterDTO()
      delete request.v
      const filters = await sut.getFilter(request)
      filters.forEach(filter => {
        expect(filter.value).toBe(undefined)
      })
    })

    test('Should use undefined value if v is empty list', async () => {
      const { sut } = makeSut()
      const request = mockGetCustomFilterDTO()
      request.v = []
      const filters = await sut.getFilter(request)
      filters.forEach(filter => {
        expect(filter.value).toBe(undefined)
      })
    })
  })

  test('Should return a filter list with correct values', async () => {
    const { sut, validParamsColumns, validRepositoryColumns } = makeSut()
    const request = mockGetCustomFilterDTO()
    for (let index: number = 0; index < request.f.length; index++) {
      request.f[index] = faker.random.arrayElement(validParamsColumns)
    }
    const filters = await sut.getFilter(request)
    filters.forEach((filter, index) => {
      const paramColumnIndex = validParamsColumns.indexOf(request.f[index])
      expect(filter.field).toBe(validRepositoryColumns[paramColumnIndex])
      expect(filter.conditional).toBe(request.c[index])
      expect(filter.operator).toBe(request.o[index])
      expect(filter.value).toBe(request.v[index])
    })
  })
})
