import { CommonRepositorySettingsModel } from '@/infrastructure/repositories'

export const AccessProfileRuleRepositorySettings: CommonRepositorySettingsModel = {
  join: {
    alias: 'access_profile_rule',
    innerJoinAndSelect: {
      access_profile: 'access_profile_rule.access_profile',
      module_access_rules: 'access_profile_rule.module_access_rules'
    }
  }
}
