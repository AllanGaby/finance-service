import { HttpHelper, HttpRequest, HttpResponse, MiddlewareProtocol } from '@/protocols/http'
import { AccessSessionModel, GetAccessSessionByTokenUseCase } from '@/domain/authentication'
import { AccessDeniedError, UnauthorizedError } from '@/data/authentication/errors'
import { FieldValidationModel, RequestValidatorProtocol } from '@/protocols/request-validator'

export class RecoverAccessSessionMiddleware implements MiddlewareProtocol<any, AccessSessionModel | object> {
  constructor (
    private readonly fieldToValidation: FieldValidationModel[],
    private readonly validator: RequestValidatorProtocol,
    private readonly getAccessSessionByTokenUseCase: GetAccessSessionByTokenUseCase,
    private readonly accessTokenName: string,
    private readonly accessRules: string[]
  ) {}

  async handle (request: HttpRequest<any>): Promise<HttpResponse<AccessSessionModel | object>> {
    try {
      const errors = this.validator.validate(this.fieldToValidation, Object(request.headers))
      if (errors) {
        return HttpHelper.unauthorized(new UnauthorizedError())
      }
      const token = request.headers[this.accessTokenName].toString().replace('Bearer ', '')
      const accessSession = await this.getAccessSessionByTokenUseCase.getByToken(token)
      if (accessSession) {
        let authorized = true
        const userAccessRules: string[] = []
        const modulesKeys = Object.keys(accessSession.modules)
        modulesKeys.forEach(module => userAccessRules.push(...accessSession.modules[module].access_profile_rules))
        for (const rule of this.accessRules) {
          authorized = userAccessRules.findIndex(profileRule => profileRule === rule) >= 0
          if (authorized) {
            break
          }
        }
        if (authorized) {
          return HttpHelper.ok(request.body, {
            ...request.headers,
            access_session: accessSession
          }, request.queryParams, request.params)
        }
      }
      return HttpHelper.forbidden(new AccessDeniedError())
    } catch (error) {
      return HttpHelper.forbidden(new AccessDeniedError())
    }
  }
}
