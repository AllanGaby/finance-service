import { JoiNumberSchemaMapper } from './joi-number.schema-mapper'
import { mockFieldValidationModel } from '@/protocols/request-validator'
import Joi from 'joi'

describe('JoiNumberSchemaMapper', () => {
  test('Should return correct Joi Schema if only name and type is provided', () => {
    const { name, type } = mockFieldValidationModel()
    const schema = JoiNumberSchemaMapper.getSchema({
      name,
      type
    })
    expect(schema).toEqual(Joi.number())
  })

  describe('Required is true', () => {
    test('Should return correct Joi Schema if only required is provided and is true', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiNumberSchemaMapper.getSchema({
        name,
        type,
        required: true
      })
      expect(schema).toEqual(Joi.number().required())
    })

    test('Should return correct Joi Schema if min is provided', () => {
      const { name, type, min } = mockFieldValidationModel()
      const schema = JoiNumberSchemaMapper.getSchema({
        name,
        type,
        required: true,
        min
      })
      expect(schema).toEqual(Joi.number().min(min).required())
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, max } = mockFieldValidationModel()
      const schema = JoiNumberSchemaMapper.getSchema({
        name,
        type,
        required: true,
        max
      })
      expect(schema).toEqual(Joi.number().max(max).required())
    })

    test('Should return correct Joi Schema if min and max are provided', () => {
      const { name, type, min, max } = mockFieldValidationModel()
      const schema = JoiNumberSchemaMapper.getSchema({
        name,
        type,
        required: true,
        min,
        max
      })
      expect(schema).toEqual(Joi.number().min(min).max(max).required())
    })
  })

  describe('Required is false', () => {
    test('Should return correct Joi Schema if only required is provided and is false', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiNumberSchemaMapper.getSchema({
        name,
        type,
        required: false
      })
      expect(schema).toEqual(Joi.number())
    })

    test('Should return correct Joi Schema if min is provided', () => {
      const { name, type, min } = mockFieldValidationModel()
      const schema = JoiNumberSchemaMapper.getSchema({
        name,
        type,
        required: false,
        min
      })
      expect(schema).toEqual(Joi.number().min(min))
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, max } = mockFieldValidationModel()
      const schema = JoiNumberSchemaMapper.getSchema({
        name,
        type,
        required: false,
        max
      })
      expect(schema).toEqual(Joi.number().max(max))
    })

    test('Should return correct Joi Schema if min and max are provided', () => {
      const { name, type, min, max } = mockFieldValidationModel()
      const schema = JoiNumberSchemaMapper.getSchema({
        name,
        type,
        required: false,
        min,
        max
      })
      expect(schema).toEqual(Joi.number().min(min).max(max))
    })
  })

  describe('Min is provided', () => {
    test('Should return correct Joi Schema if only min is provided', () => {
      const { name, type, min } = mockFieldValidationModel()
      const schema = JoiNumberSchemaMapper.getSchema({
        name,
        type,
        min
      })
      expect(schema).toEqual(Joi.number().min(min))
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, min, max } = mockFieldValidationModel()
      const schema = JoiNumberSchemaMapper.getSchema({
        name,
        type,
        min,
        max
      })
      expect(schema).toEqual(Joi.number().min(min).max(max))
    })
  })

  describe('Max is provided', () => {
    test('Should return correct Joi Schema if only max is provided', () => {
      const { name, type, max } = mockFieldValidationModel()
      const schema = JoiNumberSchemaMapper.getSchema({
        name,
        type,
        max
      })
      expect(schema).toEqual(Joi.number().max(max))
    })
  })
})
