import { FieldValidationModel } from '@/protocols/request-validator'
import { makeCreateModuleAccessRuleFieldsValidations } from '@/main/factories/authentication/fields-validations'

export const makeUpdateModuleAccessRuleFieldsValidations = (): FieldValidationModel[] =>
  makeCreateModuleAccessRuleFieldsValidations()
