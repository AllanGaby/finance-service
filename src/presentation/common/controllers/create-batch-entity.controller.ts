import { ControllerProtocol, HttpRequest, HttpResponse, HttpHelper } from '@/protocols/http'
import { EntityModel, CreateEntityUseCase, CreateEntityDTO } from '@/domain/common'
import { CreateEntityRequest } from '@/presentation/common/requests'
import { RequestValidatorProtocol, FieldValidationModel, RequestValidatorModel } from '@/protocols/request-validator'

type CreateEntityResponse<EntityType> = EntityType[] | Error | object

export class CreateBatchEntityController<EntityType extends EntityModel, CreateEntityDTOType = CreateEntityDTO<EntityType>>
implements ControllerProtocol<CreateEntityRequest<CreateEntityDTOType[]>, CreateEntityResponse<EntityType>> {
  constructor (
    private readonly fieldToValidation: FieldValidationModel[],
    private readonly validator: RequestValidatorProtocol,
    private readonly createEntityUseCase: CreateEntityUseCase<EntityType, CreateEntityDTOType[]>
  ) {}

  async handle (request: HttpRequest<CreateEntityRequest<CreateEntityDTOType[]>>): Promise<HttpResponse<CreateEntityResponse<EntityType>>> {
    const errors: RequestValidatorModel[] = []
    request.body.forEach(item => {
      const itemError = this.validator.validate(this.fieldToValidation, Object(item))
      if (itemError) {
        errors.push(...itemError)
      }
    })
    if (errors.length > 0) {
      return HttpHelper.unprocessableEntity(errors)
    }
    const entity = await this.createEntityUseCase.create(request.body)
    if (entity) {
      return HttpHelper.created(entity)
    }
    return HttpHelper.noContent()
  }
}
