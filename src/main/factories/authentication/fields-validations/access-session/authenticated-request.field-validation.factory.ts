import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeAuthenticatedTokenHeaderRequestFieldsValidations = (accessTokenName: string = 'authorization'): FieldValidationModel[] => ([
  {
    name: accessTokenName,
    type: TypeFieldValidation.String,
    required: true
  }
])
