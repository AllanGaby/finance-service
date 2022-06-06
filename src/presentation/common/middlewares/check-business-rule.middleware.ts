import { CheckBusinessRuleUseCase, CreateEntityDTO, EntityModel } from '@/domain/common'
import { HttpHelper, HttpRequest, HttpResponse, MiddlewareProtocol } from '@/protocols/http'
import { SettingsHeaderRequest } from '@/presentation/common'

export class CheckBusinessRuleMiddleware<EntityType extends EntityModel = EntityModel, CheckBusinessRuleDTOType = CreateEntityDTO<EntityType>>
implements MiddlewareProtocol<any, any, SettingsHeaderRequest> {
  constructor (
    private readonly checkBusinessRuleUseCase: CheckBusinessRuleUseCase<EntityType, CheckBusinessRuleDTOType>
  ) {}

  async handle (request: HttpRequest<any>): Promise<HttpResponse<any>> {
    await this.checkBusinessRuleUseCase.check({
      ...request.body,
      ...request.params
    }, request.headers.settings)
    return HttpHelper.ok(request.body, request.headers, request.queryParams, request.params, request.user)
  }
}
