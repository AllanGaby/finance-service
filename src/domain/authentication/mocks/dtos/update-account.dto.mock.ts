import { UpdateAccountDTO } from '@/domain/authentication'
import { datatype } from 'faker'

export const mockUpdateAccountDTO = (): UpdateAccountDTO => ({
  name: datatype.string()
})
