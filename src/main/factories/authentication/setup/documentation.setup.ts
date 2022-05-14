import { DocumentationSetupModel } from '@/protocols/documentation'
import {
  AccessProfileDocumentationSetup,
  AccessSessionDocumentarionSetup,
  AccountAccessModuleDocumentarionSetup,
  AccountDocumentarionSetup,
  ModuleAccessRuleDocumentarionSetup,
  ModuleDocumentarionSetup,
  RequestRecoverPasswordDocumentarionSetup
} from '@/main/factories/authentication/documentation'

export const AuthenticationDocumentationSetup: DocumentationSetupModel = {
  components: {
    ...AccessSessionDocumentarionSetup.components
  },
  schemas: {
    ...AccessProfileDocumentationSetup.schemas,
    ...AccessSessionDocumentarionSetup.schemas,
    ...AccountAccessModuleDocumentarionSetup.schemas,
    ...AccountDocumentarionSetup.schemas,
    ...ModuleAccessRuleDocumentarionSetup.schemas,
    ...ModuleDocumentarionSetup.schemas,
    ...RequestRecoverPasswordDocumentarionSetup.schemas
  },
  paths: {
    ...AccessProfileDocumentationSetup.paths,
    ...AccessSessionDocumentarionSetup.paths,
    ...AccountAccessModuleDocumentarionSetup.paths,
    ...AccountDocumentarionSetup.paths,
    ...ModuleAccessRuleDocumentarionSetup.paths,
    ...ModuleDocumentarionSetup.paths,
    ...RequestRecoverPasswordDocumentarionSetup.paths
  }
}
