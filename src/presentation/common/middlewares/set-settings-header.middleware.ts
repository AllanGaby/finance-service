import { HttpHelper, HttpRequest, HttpResponse, MiddlewareProtocol } from '@/protocols/http'
import { SettingsModel, GetCurrentSettingsUseCase } from '@/domain/common'

export class SetSettingsHeaderMiddleware implements MiddlewareProtocol<any, any> {
  constructor (
    private readonly getCurrentSettingsUseCase: GetCurrentSettingsUseCase
  ) {}

  async handle (request: HttpRequest<any>): Promise<HttpResponse<SettingsModel>> {
    const settings = await this.getCurrentSettingsUseCase.getCurrentSettings()
    return HttpHelper.ok(request.body, {
      ...request.headers,
      settings
    }, request.queryParams, request.params)
  }
}
