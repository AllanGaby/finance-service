import { DocumentationParamType, DocumentationSchemaModel } from '@/protocols/documentation'

export type DocumentationParamModel = DocumentationSchemaModel & {
  in: DocumentationParamType
  name: string
}
