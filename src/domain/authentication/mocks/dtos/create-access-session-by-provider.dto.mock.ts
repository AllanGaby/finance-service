import { CreateAccessSessionByProviderDTO, mockAuthenticationProvider } from '@/domain/authentication'
import { datatype, internet } from 'faker'

export const mockCreateAccessSessionByProviderDTO = (): CreateAccessSessionByProviderDTO => ({
  name: internet.userName(),
  email: internet.email(),
  ip: internet.ip(),
  account_provider_id: datatype.uuid(),
  provider: mockAuthenticationProvider()
})
