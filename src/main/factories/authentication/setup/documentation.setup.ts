import { DocumentationSetupModel } from '@/protocols/documentation'
import {
  AccessProfileSchema,
  AccessSessionSchema,
  AccessSessionModuleSchema,
  AccountAccessModuleSchema,
  AccountSchema,
  AuthenticationSchema,
  CreateAccessSessionSchema,
  CreateAccountSchema,
  CreateAccessSessionPath,
  CreateOrListAccessProfilePath,
  CreateOrListAccountPath,
  CreateOrListAccountAccessModulePath,
  CreateOrListModuleAccessRulePath,
  CreateOrListModulePath,
  CreateOrUpdateAccessProfileSchema,
  CreateOrUpdateAccountAccessModuleSchema,
  CreateOrUpdateModuleAccessRuleSchema,
  CreateOrUpdateModuleSchema,
  CreateRequestAndRecoverPasswordPath,
  CreateRequestRecoverPasswordSchema,
  DeleteOrGetAccountPath,
  DeleteOrGetOrUpdateAccessProfilePath,
  DeleteOrGetOrUpdateModuleAccessRulePath,
  DeleteOrGetOrUpdateAccountAccessModulePath,
  DeleteOrGetOrUpdateModulePath,
  ModuleAccessRuleSchema,
  ModuleSchema,
  RecoverPasswordSchema
} from '@/main/factories/authentication/documentation'

export const AuthenticationDocumentationSetup: DocumentationSetupModel = {
  components: {
    authentication: AuthenticationSchema
  },
  schemas: {
    accessProfile: AccessProfileSchema,
    accessSession: AccessSessionSchema,
    accessSessionModule: AccessSessionModuleSchema,
    accountAccessModule: AccountAccessModuleSchema,
    account: AccountSchema,
    createAccessSession: CreateAccessSessionSchema,
    createAccount: CreateAccountSchema,
    createOrUpdateAccessProfile: CreateOrUpdateAccessProfileSchema,
    createOrUpdateAccountAccessModule: CreateOrUpdateAccountAccessModuleSchema,
    createOrUpdateModule: CreateOrUpdateModuleSchema,
    createRequestRecoverPassword: CreateRequestRecoverPasswordSchema,
    createOrUpdateModuleAccessRule: CreateOrUpdateModuleAccessRuleSchema,
    module: ModuleSchema,
    moduleAccessRule: ModuleAccessRuleSchema,
    recoverPassword: RecoverPasswordSchema
  },
  paths: {
    '/authentication/access-profile/{access_profile_id}': DeleteOrGetOrUpdateAccessProfilePath,
    '/authentication/access-profile': CreateOrListAccessProfilePath,
    '/authentication/access-session': CreateAccessSessionPath,
    '/authentication/account/{account_id}': DeleteOrGetAccountPath,
    '/authentication/account': CreateOrListAccountPath,
    '/authentication/account-access-module/{account_access_module_id}': DeleteOrGetOrUpdateAccountAccessModulePath,
    '/authentication/account-access-module': CreateOrListAccountAccessModulePath,
    '/authentication/module/{module_id}': DeleteOrGetOrUpdateModulePath,
    '/authentication/module': CreateOrListModulePath,
    '/authentication/module-access-rule/{module_access_rule_id}': DeleteOrGetOrUpdateModuleAccessRulePath,
    '/authentication/module-access-rule': CreateOrListModuleAccessRulePath,
    '/authentication/request-recover-password': CreateRequestAndRecoverPasswordPath
  }
}
