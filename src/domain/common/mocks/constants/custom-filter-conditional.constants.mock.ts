import { random } from 'faker'
import { CustomFilterConditional } from '@/domain/common'

export const mockCustomFilterConditional = (): CustomFilterConditional => {
  const keys = Object.keys(CustomFilterConditional)
  const value = random.arrayElement(keys)
  return value as CustomFilterConditional
}
