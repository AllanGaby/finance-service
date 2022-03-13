import { JoiValidationAdapter } from './joi-validation.adapter'
import { JoiObjectSchemaMapper } from '@/infrastructure/request-validator/joi'
import { FieldValidationModel, TypeFieldValidation, mockFieldValidationModel, mockTypeFieldValidation } from '@/protocols/request-validator'
import { datatype, random } from 'faker'

type sutTypes = {
  sut: JoiValidationAdapter
  field: FieldValidationModel
}

const makeSut = (typeField: TypeFieldValidation = mockTypeFieldValidation()): sutTypes => ({
  field: mockFieldValidationModel(typeField),
  sut: new JoiValidationAdapter()
})

describe('JoiValidationAdapter', () => {
  describe('Validate', () => {
    test('Should call JoiObjectSchemaMapper with correct values', () => {
      const { sut } = makeSut()
      const getSchameSpy = jest.spyOn(JoiObjectSchemaMapper, 'getSchema')
      const fields = [
        mockFieldValidationModel(),
        mockFieldValidationModel(),
        mockFieldValidationModel()
      ]
      sut.validate(fields, random.objectElement())
      expect(getSchameSpy).toHaveBeenCalledWith(fields)
    })

    test('Should return undefined if Joi validate succeeds with data provided', () => {
      const { sut, field } = makeSut()
      const validation = sut.validate([{
        name: field.name,
        type: TypeFieldValidation.String,
        required: true
      }], {
        [field.name]: datatype.uuid()
      })
      expect(validation).toBeFalsy()
    })

    test('Should return a list of validations if Joi validate fails with data provided', () => {
      const { sut, field } = makeSut()
      const validation = sut.validate([{
        name: field.name,
        type: TypeFieldValidation.String,
        required: true
      }], {})
      expect(validation).toHaveLength(1)
    })
  })
})
