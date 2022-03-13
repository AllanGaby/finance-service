import { FieldValidationType } from '@/protocols/http'
import { random } from 'faker'

export const mockFieldValidationType = (): FieldValidationType =>
  random.arrayElement(Object.values(FieldValidationType))
