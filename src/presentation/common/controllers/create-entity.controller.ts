import { ControllerProtocol, HttpRequest, HttpResponse, HttpHelper } from '@/protocols/http'
import { EntityModel, CreateEntityUseCase, CreateEntityDTO } from '@/domain/common'
import { CreateEntityRequest } from '@/presentation/common/requests'

type CreateEntityResponse<EntityType> = EntityType | EntityType[] | Error | object

export class CreateEntityController<EntityType extends EntityModel, CreateEntityDTOType = CreateEntityDTO<EntityType>>
implements ControllerProtocol<CreateEntityRequest<CreateEntityDTOType>, CreateEntityResponse<EntityType>> {
  constructor (
    private readonly createEntityUseCase: CreateEntityUseCase<EntityType, CreateEntityDTOType>
  ) {}

  async handle (request: HttpRequest<CreateEntityRequest<CreateEntityDTOType>>): Promise<HttpResponse<CreateEntityResponse<EntityType>>> {
    const entity = await this.createEntityUseCase.create(request.body)
    if (entity) {
      return HttpHelper.created(entity)
    }
    return HttpHelper.noContent()
  }
}
