import { InvoiceStatus } from '@/domain/finance'
import { random } from 'faker'

export const mockInvoiceStatus = (): InvoiceStatus =>
  random.arrayElement(Object.values(InvoiceStatus))
