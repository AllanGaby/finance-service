import { AuthenticationProvider } from '@/domain/authentication'
import { random } from 'faker'

export const mockAuthenticationProvider = (): AuthenticationProvider =>
  random.arrayElement(Object.values(AuthenticationProvider))
