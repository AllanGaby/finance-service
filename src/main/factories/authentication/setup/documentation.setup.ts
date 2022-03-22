import { DocumentationSetupModel } from '@/protocols/documentation'
import {
  CreateOrListModulePath,
  CreateOrListModuleAccessRulePath,
  CreateOrUpdateModuleSchema,
  CreateOrUpdateModuleAccessRuleSchema,
  DeleteOrGetOrUpdateModulePath,
  DeleteOrGetOrUpdateModuleAccessRulePath,
  ModuleSchema,
  ModuleAccessRuleSchema
} from '@/main/factories/authentication/documentation'

export const AuthenticationDocumentationSetup: DocumentationSetupModel = {
  schemas: {
    createOrUpdateModule: CreateOrUpdateModuleSchema,
    createOrUpdateModuleAccessRule: CreateOrUpdateModuleAccessRuleSchema,
    module: ModuleSchema,
    moduleAccessRule: ModuleAccessRuleSchema
  },
  paths: {
    '/authentication/module/{module_id}': DeleteOrGetOrUpdateModulePath,
    '/authentication/module': CreateOrListModulePath,
    '/authentication/module-access-rule/{module_access_rule_id}': DeleteOrGetOrUpdateModuleAccessRulePath,
    '/authentication/module-access-rule': CreateOrListModuleAccessRulePath
  }
}
