import { TypeFieldValidation, FieldValidationModel, mockTypeFieldValidation } from '@/protocols/request-validator'
import { database, datatype } from 'faker'

export const mockFieldValidationModel = (type: TypeFieldValidation = mockTypeFieldValidation()): FieldValidationModel => {
  const field: FieldValidationModel = {
    name: database.column(),
    type,
    values: [datatype.string(), datatype.string(), datatype.string()],
    email: datatype.boolean(),
    uuid: datatype.boolean(),
    min: datatype.number(),
    max: datatype.number(),
    required: datatype.boolean(),
    array: datatype.boolean(),
    pattern: new RegExp(datatype.uuid())
  }
  if (field.type === TypeFieldValidation.Object) {
    field.fields = [
      mockFieldValidationModel(TypeFieldValidation.String),
      mockFieldValidationModel(TypeFieldValidation.Number),
      mockFieldValidationModel(TypeFieldValidation.Boolean)
    ]
  }
  return field
}
