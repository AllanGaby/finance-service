import { DocumentationBodyModel, DocumentationParamModel, DocumentationSecuritySchemaModel } from '@/protocols/documentation'

export type DocumentationRouteModel = {
  tags?: string[]
  summary?: string
  security?: DocumentationSecuritySchemaModel[]
  deprecated?: boolean
  parameters?: DocumentationParamModel[]
  requestBody?: DocumentationBodyModel
  responses?: {
    [status: number]: DocumentationBodyModel
  }
}
