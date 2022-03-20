import { EntityModel } from '@/domain/common'
import { AccountAccessModuleModel } from '@/domain/authentication'

export type AccountModel = EntityModel & {
  name: string
  email: string
  identification?: string
  password: string
  account_hash: string
  modules?: AccountAccessModuleModel[]
}
