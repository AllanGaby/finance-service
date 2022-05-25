import { mockAuthenticationProvider } from '@/domain/authentication'
import { AccountProviderRequest } from '@/presentation/authentication'
import { datatype, internet } from 'faker'

export const mockAccountProviderRequest = (): AccountProviderRequest => ({
  id: datatype.uuid(),
  displayName: internet.userName(),
  emails: [{
    value: internet.email(),
    verified: true
  }],
  provider: mockAuthenticationProvider()
})
