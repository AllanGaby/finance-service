import Joi from 'joi'
import { JoiArraySchemaMapper, JoiBooleanSchemaMapper, JoiDateSchemaMapper, JoiNumberSchemaMapper, JoiStringSchemaMapper } from '@/infrastructure/request-validator/joi/schemas'
import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export class JoiObjectSchemaMapper {
  static getSchema (fields: FieldValidationModel[]): Joi.ObjectSchema {
    const joiFields = {}
    fields.forEach(field => {
      if (field.sameTo) {
        joiFields[field.name] = Joi.ref(field.sameTo)
      } else {
        switch (field.type) {
          case TypeFieldValidation.Date:
            joiFields[field.name] = JoiDateSchemaMapper.getSchema(field)
            break
          case TypeFieldValidation.String:
            joiFields[field.name] = JoiStringSchemaMapper.getSchema(field)
            break
          case TypeFieldValidation.Number:
            joiFields[field.name] = JoiNumberSchemaMapper.getSchema(field)
            break
          case TypeFieldValidation.Boolean:
            joiFields[field.name] = JoiBooleanSchemaMapper.getSchema(field)
            break
          case TypeFieldValidation.Object: {
            let schema = JoiObjectSchemaMapper.getSchema(field.fields)
            if (field.required) {
              schema = schema.required()
            }
            joiFields[field.name] = schema
            break
          }
        }
      }
      if (field.array) {
        joiFields[field.name] = JoiArraySchemaMapper.getSchema(field, joiFields[field.name])
      }
    })
    return Joi.object(joiFields)
  }
}
