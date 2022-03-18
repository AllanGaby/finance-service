import { RequestValidatorModel } from '@/protocols/request-validator'
import { datatype, database } from 'faker'

export const mockRequestValidatorModel = (): RequestValidatorModel => ({
  path: database.column(),
  message: datatype.string()
})
