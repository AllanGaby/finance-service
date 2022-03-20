import { CreateAccessSessionDTO } from '@/domain/authentication'
import { internet } from 'faker'

export const mockCreateAccessSessionDTO = (): CreateAccessSessionDTO => ({
  login: internet.email(),
  password: internet.password()
})
