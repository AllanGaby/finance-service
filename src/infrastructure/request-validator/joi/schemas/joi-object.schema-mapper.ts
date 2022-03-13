import Joi from 'joi'
import { JoiArraySchemaMapper, JoiBooleanSchemaMapper, JoiDateSchemaMapper, JoiNumberSchemaMapper, JoiStringSchemaMapper } from '@/infrastructure/request-validator/joi/schemas'
import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export class JoiObjectSchemaMapper {
  static getSchema (fields: FieldValidationModel[]): Joi.ObjectSchema {
    const joiFields = {}
    fields.forEach(field => {
      switch (field.type) {
        case TypeFieldValidation.Boolean:
          joiFields[field.name] = JoiBooleanSchemaMapper.getSchema(field)
          break
        case TypeFieldValidation.Date:
          joiFields[field.name] = JoiDateSchemaMapper.getSchema(field)
          break
        case TypeFieldValidation.Number:
          joiFields[field.name] = JoiNumberSchemaMapper.getSchema(field)
          break
        case TypeFieldValidation.Object:
          joiFields[field.name] = JoiObjectSchemaMapper.getSchema(field.fields)
          break
        case TypeFieldValidation.String:
          joiFields[field.name] = JoiStringSchemaMapper.getSchema(field)
          break
      }
      if (field.array) {
        joiFields[field.name] = JoiArraySchemaMapper.getSchema(field, joiFields[field.name])
      }
    })
    return Joi.object(joiFields)
  }
}
