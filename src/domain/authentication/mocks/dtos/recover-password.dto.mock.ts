import { RecoverPasswordDTO } from '@/domain/authentication'
import { datatype, internet } from 'faker'

export const mockRecoverPasswordDTO = (): RecoverPasswordDTO => {
  const password = internet.password()
  return {
    verification_code: datatype.uuid(),
    password,
    password_confirmation: password
  }
}
