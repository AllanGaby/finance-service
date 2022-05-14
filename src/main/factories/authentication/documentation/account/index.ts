import { DocumentationSetupModel } from '@/protocols/documentation'
import { CreateOrListAccountPath, DeleteOrGetOrUpdateAccountPath, ListAccountsAndExportToXLSXFilePath } from './paths'
import { AccountSchema, CreateAccountSchema, UpdateAccountSchema } from './schemas'

export const AccountDocumentarionSetup: DocumentationSetupModel = {
  schemas: {
    account: AccountSchema,
    createAccount: CreateAccountSchema,
    updateAccount: UpdateAccountSchema
  },
  paths: {
    '/authentication/account/{account_id}': DeleteOrGetOrUpdateAccountPath,
    '/authentication/account': CreateOrListAccountPath,
    '/authentication/account/xlsx/{columns}': ListAccountsAndExportToXLSXFilePath
  }
}
