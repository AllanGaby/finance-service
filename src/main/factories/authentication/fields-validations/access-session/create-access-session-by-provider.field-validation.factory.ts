import { AuthenticationProvider } from '@/domain/authentication'
import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeCreateAccessSessionByProviderFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'id',
    type: TypeFieldValidation.String,
    required: true
  },
  {
    name: 'displayName',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  },
  {
    name: 'provider',
    type: TypeFieldValidation.String,
    values: Object.values(AuthenticationProvider)
  }
])
