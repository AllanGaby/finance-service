import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeCommonIdFieldsValidations = (paramIdName: string = 'id'): FieldValidationModel[] => ([
  {
    name: paramIdName,
    type: TypeFieldValidation.String,
    uuid: true,
    required: true
  }
])
