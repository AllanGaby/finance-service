import { DocumentationSetupModel } from '@/protocols/documentation'
import {
  BadRequestSchema,
  ConflictSchema,
  ErrorSchema,
  ForbiddenSchema,
  NoContentSchema,
  NotFoundSchema,
  ServerErrorSchema,
  UnauthorizedSchema,
  UnprocessableEntitySchema
} from '@/main/factories/common/documentation'

export const CommonDocumentationSetup: DocumentationSetupModel = {
  components: {
    badRequest: BadRequestSchema,
    conflict: ConflictSchema,
    error: ErrorSchema,
    forbidden: ForbiddenSchema,
    noContent: NoContentSchema,
    notFound: NotFoundSchema,
    serverError: ServerErrorSchema,
    unauthorized: UnauthorizedSchema,
    unprocessableEntity: UnprocessableEntitySchema
  }
}
