import { RefreshAccessTokenUseCase, AccessSessionPayloadModel } from '@/domain/authentication'
import { ControllerProtocol, HttpRequest, HttpResponse, HttpHelper } from '@/protocols/http'
import { SettingsHeaderRequest } from '@/presentation/common'
import { RefreshAccessTokenRequest } from '@/presentation/authentication'

type RefreshAccessTokenResponse = AccessSessionPayloadModel | Error | object

export class RefreshAccessTokenController implements ControllerProtocol<RefreshAccessTokenRequest, RefreshAccessTokenResponse> {
  constructor (
    private readonly refreshAccessTokenUseCase: RefreshAccessTokenUseCase
  ) {}

  async handle (request: HttpRequest<RefreshAccessTokenRequest, SettingsHeaderRequest>): Promise<HttpResponse<RefreshAccessTokenResponse>> {
    const accessSession = await this.refreshAccessTokenUseCase.refresh({
      ...request.body,
      ip: request.ip
    }, request.headers.settings)
    return HttpHelper.ok(accessSession)
  }
}
