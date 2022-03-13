import { JoiBooleanSchemaMapper } from './joi-boolean.schema-mapper'
import { mockFieldValidationModel } from '@/protocols/request-validator'
import Joi from 'joi'

describe('JoiBooleanSchemaMapper', () => {
  test('Should return correct Joi Schema if only name and type is provided', () => {
    const { name, type } = mockFieldValidationModel()
    const schema = JoiBooleanSchemaMapper.getSchema({
      name,
      type
    })
    expect(schema).toEqual(Joi.boolean())
  })

  describe('Required is true', () => {
    test('Should return correct Joi Schema if only required is provided and is true', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiBooleanSchemaMapper.getSchema({
        name,
        type,
        required: true
      })
      expect(schema).toEqual(Joi.boolean().required())
    })
  })

  describe('Required is false', () => {
    test('Should return correct Joi Schema if only required is provided and is false', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiBooleanSchemaMapper.getSchema({
        name,
        type,
        required: false
      })
      expect(schema).toEqual(Joi.boolean())
    })
  })
})
