import { DocumentationSetupModel } from '@/protocols/documentation'
import {
  CreateOrListModulePath,
  CreateOrUpdateModuleSchema,
  DeleteOrGetOrUpdateModulePath,
  ModuleSchema
} from '@/main/factories/authentication/documentation'

export const AuthenticationDocumentationSetup: DocumentationSetupModel = {
  schemas: {
    module: ModuleSchema,
    createOrUpdateModule: CreateOrUpdateModuleSchema
  },
  paths: {
    '/authentication/module/{module_id}': DeleteOrGetOrUpdateModulePath,
    '/authentication/module': CreateOrListModulePath
  }
}
