import { ControllerProtocol, HttpRequest, HttpResponse, HttpHelper } from '@/protocols/http'
import { EntityModel, ListEntitiesUseCase } from '@/domain/common'
import { ListEntitiesRequest, CustomFiltersRequest } from '@/presentation/common'

type ListEntitiesResponse<EntityType extends EntityModel> = EntityType[] | Error | object

export class ListEntitiesController<EntityType extends EntityModel> implements ControllerProtocol<any, ListEntitiesResponse<EntityType>, any, ListEntitiesRequest> {
  constructor (
    private readonly listEntitiesUseCase: ListEntitiesUseCase<EntityType>
  ) {}

  async handle (request: HttpRequest<CustomFiltersRequest, any, ListEntitiesRequest>): Promise<HttpResponse<ListEntitiesResponse<EntityType>>> {
    const {
      page,
      search,
      size
    } = request.queryParams
    const list = await this.listEntitiesUseCase.list({
      page,
      textToSearch: search,
      recordsPerPage: size,
      order: request.body.orders,
      filters: request.body.custom_filters
    })
    return HttpHelper.ok(list)
  }
}
