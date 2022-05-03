import { MemoryListOrderMapperUseCase } from './memory-list-order-mapper.use-case'
import { ListOrderModel, mockOrderDirection, OrderDirection } from '@/domain/common'
import { datatype } from 'faker'

type sutTypes = {
  sut: MemoryListOrderMapperUseCase
  validParamsColumns: string[]
  validRepositoryColumns: string[]
}

const makeSut = (): sutTypes => {
  const validParamsColumns = [
    datatype.uuid(),
    datatype.uuid(),
    datatype.uuid()
  ]
  const validRepositoryColumns = [
    datatype.uuid(),
    datatype.uuid(),
    datatype.uuid()
  ]
  const sut = new MemoryListOrderMapperUseCase(validParamsColumns, validRepositoryColumns)
  return {
    sut,
    validParamsColumns,
    validRepositoryColumns
  }
}

describe('MemoryListOrderMapperUseCase', () => {
  test('Should return correct value if order is empty', async () => {
    const { sut } = makeSut()
    const response = await sut.getOrders({ order: [] })
    expect(response).toEqual({})
  })

  test('Should return correct value if order is undefined', async () => {
    const { sut } = makeSut()
    const response = await sut.getOrders({ order: undefined })
    expect(response).toEqual({})
  })

  describe('Has only invalid columns', () => {
    test('Should return correct value if order has only invalid columns', async () => {
      const { sut } = makeSut()
      const response = await sut.getOrders({
        order: [
          datatype.uuid(),
          datatype.uuid(),
          datatype.uuid()
        ]
      })
      expect(response).toEqual({})
    })
  })

  describe('Has valid columns', () => {
    test('Should return correct value if direction is not provided', async () => {
      const { sut, validParamsColumns, validRepositoryColumns } = makeSut()
      const response = await sut.getOrders({
        order: validParamsColumns
      })
      const expectedOrders: ListOrderModel = {}
      validParamsColumns.forEach((_, index) => { expectedOrders[validRepositoryColumns[index]] = OrderDirection.ASC })
      expect(response).toEqual(expectedOrders)
    })

    test('Should return correct value if direction is a undefined list', async () => {
      const { sut, validParamsColumns, validRepositoryColumns } = makeSut()
      const response = await sut.getOrders({
        order: validParamsColumns,
        direction: validParamsColumns.map<any>(item => undefined)
      })
      const expectedOrders: ListOrderModel = {}
      validParamsColumns.forEach((_, index) => { expectedOrders[validRepositoryColumns[index]] = OrderDirection.ASC })
      expect(response).toEqual(expectedOrders)
    })

    test('Should return correct value if direction is provided', async () => {
      const { sut, validParamsColumns, validRepositoryColumns } = makeSut()
      const directionList: OrderDirection[] = validParamsColumns.map<OrderDirection>(_ => mockOrderDirection())
      const response = await sut.getOrders({
        order: validParamsColumns,
        direction: directionList
      })
      const expectedOrders: ListOrderModel = {}
      validParamsColumns.forEach((_, index) => { expectedOrders[validRepositoryColumns[index]] = directionList[index] })
      expect(response).toEqual(expectedOrders)
    })
  })
})
