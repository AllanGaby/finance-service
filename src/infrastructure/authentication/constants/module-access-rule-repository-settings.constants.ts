import { CommonRepositorySettingsModel } from '@/infrastructure/repositories'

export const ModuleAccessRuleRepositorySettings: CommonRepositorySettingsModel = {
  join: {
    alias: 'module_access_rule',
    innerJoinAndSelect: {
      module: 'module_access_rule.module'
    }
  }
}
