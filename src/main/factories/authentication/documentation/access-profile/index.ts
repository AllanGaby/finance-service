import { DocumentationSetupModel } from '@/protocols/documentation'
import { CreateOrListAccessProfilePath, DeleteOrGetOrUpdateAccessProfilePath, ListAccessProfilesAndExportToXLSXFilePath } from './paths'
import { AccessProfileSchema, CreateOrUpdateAccessProfileSchema } from './schemas'

export const AccessProfileDocumentationSetup: DocumentationSetupModel = {
  schemas: {
    accessProfile: AccessProfileSchema,
    createOrUpdateAccessProfile: CreateOrUpdateAccessProfileSchema
  },
  paths: {
    '/authentication/access-profile/{access_profile_id}': DeleteOrGetOrUpdateAccessProfilePath,
    '/authentication/access-profile': CreateOrListAccessProfilePath,
    '/authentication/access-profile/xlsx/{columns}': ListAccessProfilesAndExportToXLSXFilePath
  }
}
