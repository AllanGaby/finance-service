import { ControllerProtocol, HttpRequest, HttpResponse, HttpHelper } from '@/protocols/http'
import { GetEntityByIdUseCase, EntityModel } from '@/domain/common'
import { CommonIdParamsRequest } from '@/presentation/common/requests'

type GetEntityByIdResponse<EntityType extends EntityModel> = EntityType | Error | object

export class GetEntityByIdController<EntityType extends EntityModel, ParamsRequestType = CommonIdParamsRequest> implements ControllerProtocol<any, GetEntityByIdResponse<EntityType>, any, any, ParamsRequestType> {
  constructor (
    private readonly getEntityByIdUseCase: GetEntityByIdUseCase<EntityType>,
    private readonly paramIdName: string
  ) {}

  async handle (request: HttpRequest<any, any, any, ParamsRequestType>): Promise<HttpResponse<GetEntityByIdResponse<EntityType>>> {
    return HttpHelper.ok(await this.getEntityByIdUseCase.getById(request.params[this.paramIdName]))
  }
}
