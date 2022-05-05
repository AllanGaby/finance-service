import { LoginUseCase, AccessSessionPayloadModel, LoginDTO } from '@/domain/authentication'
import { ControllerProtocol, HttpRequest, HttpResponse, HttpHelper } from '@/protocols/http'
import { CreateEntityRequest, SettingsHeaderRequest } from '@/presentation/common'

type LoginResponse = AccessSessionPayloadModel | Error | object

export class LoginController implements ControllerProtocol<CreateEntityRequest<LoginDTO>, LoginResponse> {
  constructor (
    private readonly loginUseCase: LoginUseCase
  ) {}

  async handle (request: HttpRequest<CreateEntityRequest<LoginDTO>, SettingsHeaderRequest>): Promise<HttpResponse<LoginResponse>> {
    const accessSession = await this.loginUseCase.login({
      ...request.body,
      ip: request.ip
    }, request.headers.settings)
    return HttpHelper.created(accessSession)
  }
}
