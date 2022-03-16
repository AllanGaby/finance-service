import { RefreshAccessProfileRulesDTO } from '@/domain/authentication'
import { datatype } from 'faker'

export const mockRefreshAccessProfileRulesDTO = (): RefreshAccessProfileRulesDTO => ({
  access_profile_id: datatype.uuid(),
  rules_id: [
    datatype.uuid(),
    datatype.uuid(),
    datatype.uuid(),
    datatype.uuid(),
    datatype.uuid()
  ]
})
