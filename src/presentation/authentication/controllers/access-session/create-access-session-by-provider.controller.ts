import { CreateEntityUseCase } from '@/domain/common'
import { AccessSessionPayloadModel, CreateAccessSessionByProviderDTO } from '@/domain/authentication'
import { ControllerProtocol, HttpRequest, HttpResponse, HttpHelper } from '@/protocols/http'
import { SettingsHeaderRequest } from '@/presentation/common'
import { AccountProviderRequest } from '@/presentation/authentication'

type CreateAccessSessionByProviderResponse = AccessSessionPayloadModel | Error | object

export class CreateAccessSessionByProviderController implements ControllerProtocol<any, CreateAccessSessionByProviderResponse> {
  constructor (
    private readonly createAccessSessionByProviderUseCase: CreateEntityUseCase<AccessSessionPayloadModel, CreateAccessSessionByProviderDTO>
  ) {}

  async handle (request: HttpRequest<any, SettingsHeaderRequest, any, any, AccountProviderRequest>): Promise<HttpResponse<CreateAccessSessionByProviderResponse>> {
    const email = request.user.emails.filter(item => item.verified)[0].value
    const account = await this.createAccessSessionByProviderUseCase.create({
      name: request.user.displayName,
      ip: request.ip,
      account_provider_id: request.user.id,
      provider: request.user.provider,
      email
    }, request.headers.settings)
    return HttpHelper.created(account)
  }
}
