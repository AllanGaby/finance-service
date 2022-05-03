import { ListOrderMapperUseCase } from '@/domain/common'
import { HttpHelper, HttpRequest, HttpResponse, MiddlewareProtocol } from '@/protocols/http'
import { ListEntitiesRequest } from '@/presentation/common'

export class ListOrdersMapperMiddleware implements MiddlewareProtocol<any, any> {
  constructor (
    private readonly listOrderMapperUseCase: ListOrderMapperUseCase
  ) {}

  async handle (request: HttpRequest<any, any, ListEntitiesRequest>): Promise<HttpResponse<any>> {
    const {
      order,
      direction
    } = request.queryParams
    const orders = await this.listOrderMapperUseCase.getOrders({
      order: Array.isArray(order) ? order : [order],
      direction: Array.isArray(direction) ? direction : [direction]
    })
    return HttpHelper.ok({
      orders
    }, request.headers, request.queryParams, request.params)
  }
}
