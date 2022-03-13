import { ControllerProtocol, HttpRequest, HttpResponse, HttpHelper } from '@/protocols/http'
import { GetEntityByIdUseCase, EntityModel } from '@/domain/common'
import { CommonIdParamsRequest } from '@/presentation/common/requests'

type ShowEntityResponse<EntityType extends EntityModel> = EntityType | Error | object

export class ShowEntityController<EntityType extends EntityModel, ParamsRequestType = CommonIdParamsRequest> implements ControllerProtocol<any, ShowEntityResponse<EntityType>, any, any, ParamsRequestType> {
  constructor (
    private readonly getEntityByIdUseCase: GetEntityByIdUseCase<EntityType>,
    private readonly paramIdName: string
  ) {}

  async handle (request: HttpRequest<any, any, any, ParamsRequestType>): Promise<HttpResponse<ShowEntityResponse<EntityType>>> {
    return HttpHelper.ok(await this.getEntityByIdUseCase.getById(request.params[this.paramIdName]))
  }
}
