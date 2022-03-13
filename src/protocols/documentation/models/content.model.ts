import { DocumentationSchemaModel } from '@/protocols/documentation'

export type DocumentationContentModel = {
  [contentType: string]: {
    schema: DocumentationSchemaModel
  }
}
