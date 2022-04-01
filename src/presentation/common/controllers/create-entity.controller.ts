import { ControllerProtocol, HttpRequest, HttpResponse, HttpHelper } from '@/protocols/http'
import { CreateEntityUseCase, CreateEntityDTO } from '@/domain/common'
import { CreateEntityRequest, SettingsHeaderRequest } from '@/presentation/common'

type CreateEntityResponse<EntityType> = EntityType | EntityType[] | Error | object

export class CreateEntityController<EntityType, CreateEntityDTOType = CreateEntityDTO<EntityType>>
implements ControllerProtocol<CreateEntityRequest<CreateEntityDTOType>, CreateEntityResponse<EntityType>> {
  constructor (
    private readonly createEntityUseCase: CreateEntityUseCase<EntityType, CreateEntityDTOType>
  ) {}

  async handle (request: HttpRequest<CreateEntityRequest<CreateEntityDTOType>, SettingsHeaderRequest>): Promise<HttpResponse<CreateEntityResponse<EntityType>>> {
    const entity = await this.createEntityUseCase.create(request.body, request.headers.settings)
    if (entity) {
      return HttpHelper.created(entity)
    }
    return HttpHelper.noContent()
  }
}
