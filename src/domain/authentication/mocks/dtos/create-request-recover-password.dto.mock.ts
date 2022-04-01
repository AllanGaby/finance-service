import { CreateRequestRecoverPasswordDTO } from '@/domain/authentication'
import { internet } from 'faker'

export const mockCreateRequestRecoverPasswordDTO = (): CreateRequestRecoverPasswordDTO => ({
  email: internet.email()
})
