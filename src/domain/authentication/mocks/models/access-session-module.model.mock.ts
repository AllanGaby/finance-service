import { AccessSessionModuleModel } from '@/domain/authentication'
import { datatype } from 'faker'

export const mockAccessSessionModuleModel = (): AccessSessionModuleModel => ({
  [datatype.uuid()]: {
    access_profile_key: datatype.uuid(),
    access_profile_rules: [
      datatype.uuid(),
      datatype.uuid(),
      datatype.uuid(),
      datatype.uuid()
    ]
  }
})
