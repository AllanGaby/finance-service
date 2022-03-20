import { HttpHelper, HttpRequest, HttpResponse, MiddlewareProtocol } from '@/protocols/http'
import { DecryptRequestWithPrivateKeyProtocol } from '@/protocols/rsa'
import { InvalidCredentialsError } from '@/data/authentication/errors'

export class DecryptRequestMiddleware implements MiddlewareProtocol<any, any> {
  constructor (
    private readonly decryptRequestWithPrivateKeyAdapter: DecryptRequestWithPrivateKeyProtocol,
    private readonly fieldName: string
  ) {}

  async handle (request: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const decryptedValue = JSON.parse(this.decryptRequestWithPrivateKeyAdapter.decrypt(request.body[this.fieldName]))
      return HttpHelper.ok({
        ...request.body,
        ...decryptedValue
      }, request.headers, request.queryParams, request.params)
    } catch {
      return HttpHelper.unauthorized(new InvalidCredentialsError())
    }
  }
}
