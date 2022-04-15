import { MapperCustomFilterUseCase } from '@/domain/common'
import { HttpHelper, HttpRequest, HttpResponse, MiddlewareProtocol } from '@/protocols/http'
import { ListEntitiesRequest } from '@/presentation/common'

export class MapperCustomFiltersMiddleware implements MiddlewareProtocol<any, any> {
  constructor (
    private readonly mapperCustomFilterUseCase: MapperCustomFilterUseCase
  ) {}

  async handle (request: HttpRequest<any, any, ListEntitiesRequest>): Promise<HttpResponse<any>> {
    const {
      field = [],
      value = [],
      operator = [],
      conditional = []
    } = request.queryParams
    const customFilters = await this.mapperCustomFilterUseCase.mapperFilters({
      fields: Array.isArray(field) ? field : [field],
      conditionals: Array.isArray(conditional) ? conditional : [conditional],
      operators: Array.isArray(operator) ? operator : [operator],
      values: Array.isArray(value) ? value : [value]
    })
    return HttpHelper.ok({
      cursom_filters: customFilters
    }, request.headers, request.queryParams, request.params)
  }
}
