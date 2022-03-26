import { mockCreateAccountDTO } from '@/domain/authentication'
import { CreateAccountRequest } from '@/presentation/authentication'

export const mockCreateAccountRequest = (): CreateAccountRequest => {
  const createAccountDTO = mockCreateAccountDTO()
  return {
    ...createAccountDTO,
    password_confirmation: createAccountDTO.password
  }
}
