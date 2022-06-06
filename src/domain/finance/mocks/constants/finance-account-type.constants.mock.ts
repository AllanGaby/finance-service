import { FinanceAccountType } from '@/domain/finance'
import { random } from 'faker'

export const mockFinanceAccountType = (): FinanceAccountType =>
  random.arrayElement(Object.values(FinanceAccountType))
