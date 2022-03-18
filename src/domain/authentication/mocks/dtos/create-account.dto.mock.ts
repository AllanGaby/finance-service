import { CreateAccountDTO } from '@/domain/authentication'
import { datatype, internet } from 'faker'

export const mockCreateAccountDTO = (): CreateAccountDTO => ({
  name: datatype.string(),
  email: internet.email(),
  identification: datatype.uuid(),
  password: internet.password(),
  account_hash: datatype.uuid()
})
