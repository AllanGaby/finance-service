import { JsonWebTokenModel } from '@/protocols/jwt'
import { datatype, random } from 'faker'

export const mockJsonWebTokenModel = (payload: Object = random.objectElement()): JsonWebTokenModel => ({
  payload,
  subject: datatype.string()
})
