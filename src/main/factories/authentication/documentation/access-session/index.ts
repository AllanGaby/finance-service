import { DocumentationSetupModel } from '@/protocols/documentation'
import { AuthenticationSchema } from './components'
import { CreateAccessSessionPath } from './paths'
import { AccessSessionModuleSchema, AccessSessionSchema, CreateAccessSessionSchema } from './schemas'

export const AccessSessionDocumentarionSetup: DocumentationSetupModel = {
  components: {
    authentication: AuthenticationSchema
  },
  schemas: {
    accessSession: AccessSessionSchema,
    accessSessionModule: AccessSessionModuleSchema,
    createAccessSession: CreateAccessSessionSchema
  },
  paths: {
    '/authentication/access-session': CreateAccessSessionPath
  }
}
