import { AuthenticationProvider } from '@/domain/authentication'

export type CreateAccessSessionByProviderDTO = {
  name: string
  email: string
  ip: string
  account_provider_id: string
  provider: AuthenticationProvider
}
