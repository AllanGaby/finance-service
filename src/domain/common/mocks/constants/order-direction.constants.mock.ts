import { random } from 'faker'
import { OrderDirection } from '@/domain/common'

export const mockOrderDirection = (): OrderDirection => {
  const keys = Object.keys(OrderDirection)
  const value = random.arrayElement(keys)
  return value as OrderDirection
}
