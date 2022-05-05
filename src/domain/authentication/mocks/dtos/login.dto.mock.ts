import { LoginDTO } from '@/domain/authentication'
import { internet } from 'faker'

export const mockLoginDTO = (): LoginDTO => ({
  login: internet.email(),
  password: internet.password(),
  ip: internet.ip()
})
