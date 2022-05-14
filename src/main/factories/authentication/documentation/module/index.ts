import { DocumentationSetupModel } from '@/protocols/documentation'
import { CreateOrListModulePath, DeleteOrGetOrUpdateModulePath, ListModulesAndExportToXLSXFilePath } from './paths'
import { CreateOrUpdateModuleSchema, ModuleSchema } from './schemas'

export const ModuleDocumentarionSetup: DocumentationSetupModel = {
  schemas: {
    createOrUpdateModule: CreateOrUpdateModuleSchema,
    module: ModuleSchema
  },
  paths: {
    '/authentication/module': CreateOrListModulePath,
    '/authentication/module/{module_id}': DeleteOrGetOrUpdateModulePath,
    '/authentication/module/xlsx/{columns}': ListModulesAndExportToXLSXFilePath
  }
}
