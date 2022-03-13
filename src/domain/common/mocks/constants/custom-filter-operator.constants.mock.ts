import { random } from 'faker'
import { CustomFilterOperator } from '@/domain/common'

export const mockCustomFilterOperator = (): CustomFilterOperator => {
  const keys = Object.keys(CustomFilterOperator)
  const value = random.arrayElement(keys)
  return value as CustomFilterOperator
}
