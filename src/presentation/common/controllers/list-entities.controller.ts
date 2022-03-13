import { ControllerProtocol, HttpRequest, HttpResponse, HttpHelper } from '@/protocols/http'
import { EntityModel, GetCustomFilterUseCase, ListEntitiesUseCase } from '@/domain/common'
import { ListEntitiesRequest } from '@/presentation/common/requests'

type ListEntitiesResponse<EntityType extends EntityModel> = EntityType[] | Error | object

export class ListEntitiesController<EntityType extends EntityModel> implements ControllerProtocol<any, ListEntitiesResponse<EntityType>, any, ListEntitiesRequest> {
  constructor (
    private readonly getCustomFilterUseCase: GetCustomFilterUseCase,
    private readonly listEntitiesUseCase: ListEntitiesUseCase<EntityType>
  ) {}

  async handle (request: HttpRequest<any, any, ListEntitiesRequest>): Promise<HttpResponse<ListEntitiesResponse<EntityType>>> {
    const { page, search, size, order, direction, f = [], v = [], o = [], c = [] } = request.queryParams

    const filters = await this.getCustomFilterUseCase.getFilter({
      f: Array.isArray(f) ? f : [f],
      c: Array.isArray(c) ? c : [c],
      o: Array.isArray(o) ? o : [o],
      v: Array.isArray(v) ? v : [v]
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
