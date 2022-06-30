import { RepositoryAccessProfileRuleFilter, SearchAccessProfileRuleFilter } from '@/domain/authentication'
import { CommonRepositorySettingsModel } from '@/infrastructure/repositories'

export const AccessProfileRuleRepositorySettings: CommonRepositorySettingsModel = {
  join: {
    alias: 'access_profile_rule',
    innerJoinAndSelect: {
      access_profile: 'access_profile_rule.access_profile',
      module_access_rule: 'access_profile_rule.module_access_rule'
    }
  },
  columnsToFilter: Object.values(RepositoryAccessProfileRuleFilter),
  columnsToSearch: Object.values(SearchAccessProfileRuleFilter)
}
