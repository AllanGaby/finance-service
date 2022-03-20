import { ControllerProtocol, HttpRequest, HttpResponse, HttpHelper } from '@/protocols/http'
import { EntityModel, MapperCustomFilterUseCase, ListEntitiesUseCase } from '@/domain/common'
import { ListEntitiesRequest } from '@/presentation/common'

type ListEntitiesResponse<EntityType extends EntityModel> = EntityType[] | Error | object

export class ListEntitiesController<EntityType extends EntityModel> implements ControllerProtocol<any, ListEntitiesResponse<EntityType>, any, ListEntitiesRequest> {
  constructor (
    private readonly mapperCustomFilterUseCase: MapperCustomFilterUseCase,
    private readonly listEntitiesUseCase: ListEntitiesUseCase<EntityType>
  ) {}

  async handle (request: HttpRequest<any, any, ListEntitiesRequest>): Promise<HttpResponse<ListEntitiesResponse<EntityType>>> {
    const {
      page,
      search,
      size,
      order,
      direction,
      field = [],
      value = [],
      operator = [],
      conditional = []
    } = request.queryParams
    const filters = await this.mapperCustomFilterUseCase.mapperFilters({
      fields: Array.isArray(field) ? field : [field],
      conditionals: Array.isArray(conditional) ? conditional : [conditional],
      operators: Array.isArray(operator) ? operator : [operator],
      values: Array.isArray(value) ? value : [value]
    })
    const list = await this.listEntitiesUseCase.list({
      page,
      textToSearch: search,
      recordsPerPage: size,
      orderColumn: order,
      orderDirection: direction,
      filters
    })
    return HttpHelper.ok(list)
  }
}
