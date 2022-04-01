import { ControllerProtocol, HttpRequest, HttpResponse, HttpHelper } from '@/protocols/http'
import { UpdateEntityUseCase, EntityModel, UpdateEntityDTO } from '@/domain/common'
import { UpdateEntityRequest } from '@/presentation/common'

type UpdateEntityResponse<EntityType extends EntityModel> = EntityType | Error | object

export class UpdateEntityController<EntityType extends EntityModel, UpdateEntityDTOType = UpdateEntityDTO<EntityType>>
implements ControllerProtocol<UpdateEntityRequest<UpdateEntityDTOType>, UpdateEntityResponse<EntityType>, any> {
  constructor (
    private readonly updateEntityUseCase: UpdateEntityUseCase<EntityType, UpdateEntityDTOType>
  ) {}

  async handle (request: HttpRequest<UpdateEntityRequest<UpdateEntityDTOType>>): Promise<HttpResponse<UpdateEntityResponse<EntityType>>> {
    const entity = await this.updateEntityUseCase.update(request.body)
    if (entity) {
      return HttpHelper.ok(entity)
    }
    return HttpHelper.noContent()
  }
}
