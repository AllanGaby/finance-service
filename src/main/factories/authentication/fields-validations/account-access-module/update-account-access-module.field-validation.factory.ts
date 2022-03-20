import { makeCreateAccountAccessModuleFieldsValidations } from '@/main/factories/authentication/fields-validations'
import { FieldValidationModel } from '@/protocols/request-validator'

export const makeUpdateAccountAccessModuleFieldsValidations = (): FieldValidationModel[] => makeCreateAccountAccessModuleFieldsValidations()
