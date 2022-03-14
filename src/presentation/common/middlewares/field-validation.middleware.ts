import { HttpHelper, HttpRequest, HttpResponse, MiddlewareProtocol, FieldValidationType } from '@/protocols/http'
import { FieldValidationModel, RequestValidatorProtocol } from '@/protocols/request-validator'

export class FieldValidationMiddleware implements MiddlewareProtocol<any, any> {
  constructor (
    private readonly validator: RequestValidatorProtocol,
    private readonly fieldToValidation: FieldValidationModel[],
    private readonly fieldValidationType: FieldValidationType = FieldValidationType.Body
  ) {}

  async handle (request: HttpRequest<any>): Promise<HttpResponse<any>> {
    if (this.fieldToValidation?.length > 0) {
      const errors = this.validator.validate(this.fieldToValidation, Object(request[this.fieldValidationType]))
      if (errors) {
        return HttpHelper.unprocessableEntity(errors)
      }
    }
    return HttpHelper.ok(request.body, request.headers)
  }
}
