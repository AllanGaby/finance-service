import { EntityModel } from '@/domain/common'
import { AuthenticationProvider, AccountModel } from '@/domain/authentication'

export type AccountProviderModel = EntityModel & {
  account_id: string
  account_provider_id: string
  provider: AuthenticationProvider
  account?: AccountModel
}
