import { RecoverPasswordDTO } from '@/domain/authentication'
import { datatype, internet } from 'faker'

export const mockRecoverPasswordDTO = (): RecoverPasswordDTO => {
  const password = internet.password()
  return {
    verification_code: datatype.number({ min: 100000, max: 999999 }).toString(),
    password,
    password_confirmation: password
  }
}
