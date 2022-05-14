import { DocumentationSetupModel } from '@/protocols/documentation'
import { CreateOrListAccountAccessModulePath, DeleteOrGetOrUpdateAccountAccessModulePath } from './paths'
import { AccountAccessModuleSchema, CreateOrUpdateAccountAccessModuleSchema } from './schemas'

export const AccountAccessModuleDocumentarionSetup: DocumentationSetupModel = {
  schemas: {
    createOrUpdateAccountAccessModule: CreateOrUpdateAccountAccessModuleSchema,
    accountAccessModule: AccountAccessModuleSchema
  },
  paths: {
    '/authentication/account-access-module': CreateOrListAccountAccessModulePath,
    '/authentication/account-access-module/{account_access_module_id}': DeleteOrGetOrUpdateAccountAccessModulePath
  }
}
