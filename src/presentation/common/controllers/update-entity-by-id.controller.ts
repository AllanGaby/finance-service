import { ControllerProtocol, HttpRequest, HttpResponse, HttpHelper } from '@/protocols/http'
import { UpdateEntityByIdUseCase, EntityModel, UpdateEntityDTO } from '@/domain/common'
import { UpdateEntityRequest } from '@/presentation/common'

export type UpdateEntityByIdRequestDefault = {
  id: string
}

type UpdateEntityByIdResponse<EntityType extends EntityModel> = EntityType | Error | object

export class UpdateEntityByIdController<EntityType extends EntityModel, UpdateEntityDTOType = UpdateEntityDTO<EntityType>, ParamsRequestType = UpdateEntityByIdRequestDefault>
implements ControllerProtocol<UpdateEntityRequest<UpdateEntityDTOType>, UpdateEntityByIdResponse<EntityType>, any, ParamsRequestType> {
  constructor (
    private readonly updateEntityUseCase: UpdateEntityByIdUseCase<EntityType, UpdateEntityDTOType>,
    private readonly paramIdName: string
  ) {}

  async handle (request: HttpRequest<UpdateEntityRequest<UpdateEntityDTOType>, any, any, UpdateEntityByIdRequestDefault>): Promise<HttpResponse<UpdateEntityByIdResponse<EntityType>>> {
    const entity = await this.updateEntityUseCase.updateById(request.params[this.paramIdName], request.body)
    if (entity) {
      return HttpHelper.ok(entity)
    }
    return HttpHelper.noContent()
  }
}
