export type CreateAccessProfileDTO = {
  name: string
  enabled: boolean
  access_profile_key: string
  module_id: string
  rules_id: string[]
}
