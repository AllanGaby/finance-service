import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeCreateCompanyFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'name',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  },
  {
    name: 'company_type_id',
    type: TypeFieldValidation.String,
    required: true,
    uuid: true
  }
])
