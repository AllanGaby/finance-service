import { EntityModel } from '@/domain/common'
import { AccountAccessModuleModel, AccountProviderModel } from '@/domain/authentication'

export type AccountModel = EntityModel & {
  name: string
  email: string
  identification?: string
  password?: string
  account_hash: string
  modules?: AccountAccessModuleModel[]
  providers?: AccountProviderModel[]
}
