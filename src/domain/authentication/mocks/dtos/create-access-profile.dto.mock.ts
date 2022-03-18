import { CreateAccessProfileDTO } from '@/domain/authentication'
import { datatype } from 'faker'

export const mockCreateAccessProfileDTO = (): CreateAccessProfileDTO => ({
  name: datatype.string(),
  enabled: datatype.boolean(),
  access_profile_key: datatype.uuid(),
  module_id: datatype.uuid(),
  rules_id: [
    datatype.uuid(),
    datatype.uuid(),
    datatype.uuid(),
    datatype.uuid(),
    datatype.uuid()
  ]
})
