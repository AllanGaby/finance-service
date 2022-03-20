export type AccessSessionModuleModel = {
  [module_key: string]: {
    access_profile_key: string
    access_profile_rules: string[]
  }
}
