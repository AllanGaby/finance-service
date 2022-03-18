import { TypeFieldValidation } from '@/protocols/request-validator'
import { random } from 'faker'

export const mockTypeFieldValidation = (): TypeFieldValidation => {
  return random.arrayElement(Object.values(TypeFieldValidation)) as TypeFieldValidation
}
