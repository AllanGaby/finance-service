import Joi from 'joi'
import { FieldValidationModel } from '@/protocols/request-validator'

export class JoiBooleanSchemaMapper {
  static getSchema (field: FieldValidationModel): Joi.BooleanSchema {
    let schema: Joi.BooleanSchema = Joi.boolean()
    if (field.required) {
      schema = schema.required()
    }
    return schema
  }
}
