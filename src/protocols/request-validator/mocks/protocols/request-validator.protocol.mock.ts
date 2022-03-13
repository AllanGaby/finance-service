import { RequestValidatorProtocol, FieldValidationModel, RequestValidatorModel } from '@/protocols/request-validator'

export class RequestValidatorSpy implements RequestValidatorProtocol {
  data: any
  fieldsToValidate: FieldValidationModel[]
  validation: RequestValidatorModel[] = undefined

  validate (fields: FieldValidationModel[], data: any): RequestValidatorModel[] {
    this.fieldsToValidate = fields
    this.data = data
    return this.validation
  }
}
