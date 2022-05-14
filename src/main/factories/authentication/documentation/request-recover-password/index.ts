import { DocumentationSetupModel } from '@/protocols/documentation'
import { CreateRequestAndRecoverPasswordPath } from './paths'
import { CreateRequestRecoverPasswordSchema, RecoverPasswordSchema } from './schemas'

export const RequestRecoverPasswordDocumentarionSetup: DocumentationSetupModel = {
  schemas: {
    createRequestRecoverPassword: CreateRequestRecoverPasswordSchema,
    recoverPassword: RecoverPasswordSchema
  },
  paths: {
    '/authentication/request-recover-password': CreateRequestAndRecoverPasswordPath
  }
}
