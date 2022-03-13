import { ControllerProtocol, HttpRequest, HttpResponse, HttpHelper } from '@/protocols/http'
import { DeleteEntityByIdUseCase, EntityModel } from '@/domain/common'
import { CommonIdParamsRequest } from '@/presentation/common/requests'

type DeleteEntityResponse = undefined | Error | object

export class DeleteEntityController<EntityType extends EntityModel, ParamsRequestType = CommonIdParamsRequest> implements ControllerProtocol<any, DeleteEntityResponse, any, any, ParamsRequestType> {
  constructor (
    private readonly deleteEntityByIdUseCase: DeleteEntityByIdUseCase<EntityType>,
    private readonly paramIdName: string
  ) {}

  async handle (request: HttpRequest<any, any, any, ParamsRequestType>): Promise<HttpResponse<DeleteEntityResponse>> {
    await this.deleteEntityByIdUseCase.deleteById(request.params[this.paramIdName])
    return HttpHelper.noContent()
  }
}
