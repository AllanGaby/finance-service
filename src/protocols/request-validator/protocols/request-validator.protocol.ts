import { RequestValidatorModel, FieldValidationModel } from '@/protocols/request-validator'

export interface RequestValidatorProtocol {
  validate: (fields: FieldValidationModel[], data: any) => RequestValidatorModel[]
}
