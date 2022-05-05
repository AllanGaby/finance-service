import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeRefreshAccessTokenFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'access_token',
    type: TypeFieldValidation.String,
    required: true
  }
])
