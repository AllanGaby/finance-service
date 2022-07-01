import { ControllerProtocol, HttpRequest, HttpResponse, HttpHelper } from '@/protocols/http'
import { CustomFilterConditional, CustomFilterOperator, EntityModel, ListEntitiesUseCase } from '@/domain/common'
import { ListEntitiesRequest, CustomFiltersRequest } from '@/presentation/common'
import { AccessSessionHeaderRequest } from '@/presentation/authentication'

type ListEntitiesResponse<EntityType extends EntityModel> = EntityType[] | Error | object

export class ListEntitiesController<EntityType extends EntityModel> implements ControllerProtocol<any, ListEntitiesResponse<EntityType>, any, ListEntitiesRequest> {
  constructor (
    private readonly listEntitiesUseCase: ListEntitiesUseCase<EntityType>,
    private readonly accountIdField?: string
  ) {}

  async handle (request: HttpRequest<CustomFiltersRequest, AccessSessionHeaderRequest, ListEntitiesRequest>): Promise<HttpResponse<ListEntitiesResponse<EntityType>>> {
    const {
      page,
      search,
      size
    } = request.queryParams
    const { access_session: accessSession } = request.headers
    const { custom_filters: customFilters } = request.body
    if (accessSession && this.accountIdField) {
      customFilters.push({
        field: this.accountIdField,
        conditional: CustomFilterConditional.equal,
        operator: CustomFilterOperator.and,
        value: accessSession.account_id
      })
    }
    const list = await this.listEntitiesUseCase.list({
      page,
      textToSearch: search,
      recordsPerPage: size,
      order: request.body.orders,
      filters: customFilters
    })
    return HttpHelper.ok(list)
  }
}
