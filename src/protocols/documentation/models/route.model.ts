import { DocumentationBodyModel, DocumentationParamModel } from '@/protocols/documentation'

export type DocumentationRouteModel = {
  tags?: string[]
  summary?: string
  deprecated?: boolean
  parameters?: DocumentationParamModel[]
  requestBody?: DocumentationBodyModel
  responses?: {
    [status: number]: DocumentationBodyModel
  }
}
