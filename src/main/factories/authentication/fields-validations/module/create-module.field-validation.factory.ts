import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeCreateModuleFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'name',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  },
  {
    name: 'description',
    type: TypeFieldValidation.String
  },
  {
    name: 'module_key',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  },
  {
    name: 'enabled',
    type: TypeFieldValidation.Boolean
  }
])
