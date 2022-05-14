import { DocumentationSetupModel } from '@/protocols/documentation'
import { CreateOrListModuleAccessRulePath, DeleteOrGetOrUpdateModuleAccessRulePath, ListModuleAccessRulesAndExportToXLSXFilePath } from './paths'
import { CreateOrUpdateModuleAccessRuleSchema, ModuleAccessRuleSchema } from './schemas'

export const ModuleAccessRuleDocumentarionSetup: DocumentationSetupModel = {
  schemas: {
    moduleAccessRule: ModuleAccessRuleSchema,
    createOrUpdateModuleAccessRule: CreateOrUpdateModuleAccessRuleSchema
  },
  paths: {
    '/authentication/module-access-rule/{module_access_rule_id}': DeleteOrGetOrUpdateModuleAccessRulePath,
    '/authentication/module-access-rule/xlsx/{columns}': ListModuleAccessRulesAndExportToXLSXFilePath,
    '/authentication/module-access-rule': CreateOrListModuleAccessRulePath
  }
}
