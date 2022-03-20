import { CreateAccountDTO } from '@/domain/authentication'

export type CreateAccountRequest = CreateAccountDTO & {
  password_confirmation: string
}
