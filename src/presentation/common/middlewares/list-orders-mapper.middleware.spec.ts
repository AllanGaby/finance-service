import { ListOrdersMapperMiddleware } from './list-orders-mapper.middleware'
import { ListOrderMapperUseCaseSpy, ListOrderModel, mockListOrderModel, OrderDirection } from '@/domain/common'
import { HttpHelper, HttpRequest } from '@/protocols/http'
import { ListEntitiesRequest, mockListEntitiesRequest } from '@/presentation/common'
import { datatype } from 'faker'

type sutTypes = {
  sut: ListOrdersMapperMiddleware
  listOrderMapperUseCase: ListOrderMapperUseCaseSpy
  request: HttpRequest<any, any, ListEntitiesRequest>
}

const makeSut = (): sutTypes => {
  const listOrderMapperUseCase = new ListOrderMapperUseCaseSpy()
  const sut = new ListOrdersMapperMiddleware(listOrderMapperUseCase)
  return {
    sut,
    listOrderMapperUseCase,
    request: mockListEntitiesRequest()
  }
}

describe('ListOrdersMapperMiddleware', () => {
  describe('Call ListOrderMapperUseCase', () => {
    describe('Order', () => {
      test('Should call ListOrderMapperUseCase with correct value if order is not provided', async () => {
        const { sut, listOrderMapperUseCase, request } = makeSut()
        const getOrdersSpy = jest.spyOn(listOrderMapperUseCase, 'getOrders')
        delete request.queryParams.order
        await sut.handle(request)
        const { direction } = request.queryParams
        expect(getOrdersSpy).toHaveBeenCalledWith({
          order: [undefined],
          direction
        })
      })

      test('Should call ListOrderMapperUseCase with correct value if order is a string', async () => {
        const { sut, listOrderMapperUseCase, request } = makeSut()
        const getOrdersSpy = jest.spyOn(listOrderMapperUseCase, 'getOrders')
        request.queryParams.order = datatype.uuid()
        await sut.handle(request)
        const { order, direction } = request.queryParams
        expect(getOrdersSpy).toHaveBeenCalledWith({
          order: [order],
          direction
        })
      })
    })

    describe('Direction', () => {
      test('Should call ListOrderMapperUseCase with correct value if direction is not provided', async () => {
        const { sut, listOrderMapperUseCase, request } = makeSut()
        const getOrdersSpy = jest.spyOn(listOrderMapperUseCase, 'getOrders')
        delete request.queryParams.direction
        await sut.handle(request)
        const { order } = request.queryParams
        expect(getOrdersSpy).toHaveBeenCalledWith({
          order,
          direction: [undefined]
        })
      })

      test('Should call ListOrderMapperUseCase with correct value if direction is only direction', async () => {
        const { sut, listOrderMapperUseCase, request } = makeSut()
        const getOrdersSpy = jest.spyOn(listOrderMapperUseCase, 'getOrders')
        request.queryParams.direction = OrderDirection.ASC
        await sut.handle(request)
        const { order, direction } = request.queryParams
        expect(getOrdersSpy).toHaveBeenCalledWith({
          order,
          direction: [direction]
        })
      })
    })
  })

  describe('Return correct value', () => {
    test('Should return Ok Status Code (200) with correct values', async () => {
      const { sut, request, listOrderMapperUseCase } = makeSut()
      const listOrders: ListOrderModel = mockListOrderModel()
      jest.spyOn(listOrderMapperUseCase, 'getOrders').mockResolvedValue(listOrders)
      const { headers, params, queryParams } = request
      const response = await sut.handle(request)
      expect(response).toEqual(HttpHelper.ok({
        orders: listOrders
      }, headers, queryParams, params))
    })
  })
})
