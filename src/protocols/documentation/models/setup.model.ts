import { DocumentationBodyModel, DocumentationSchemaModel, DocumentationPathModel } from '@/protocols/documentation'

export type DocumentationSetupModel = {
  components?: {
    [name: string]: DocumentationBodyModel
  }
  schemas?: {
    [name: string]: DocumentationSchemaModel
  }
  paths?: {
    [path: string]: DocumentationPathModel
  }
}
