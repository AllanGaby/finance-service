import { AuthenticationProvider } from '@/domain/authentication'

export type AccountProviderRequest = {
  id: string
  displayName: string
  emails: [{
    value: string
    verified: boolean
  }]
  provider: AuthenticationProvider
}
