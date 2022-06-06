import { FinanceTransctionType } from '@/domain/finance'
import { random } from 'faker'

export const mockFinanceTransctionType = (): FinanceTransctionType =>
  random.arrayElement(Object.values(FinanceTransctionType))
