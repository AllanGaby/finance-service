import { DocumentationSchemaModel, DocumentationDataType } from '@/protocols/documentation'

export const ErrorSchema: DocumentationSchemaModel = {
  type: DocumentationDataType.Object,
  properties: {
    error: {
      type: DocumentationDataType.Object,
      description: 'Descrição do erro que aconteceu'
    }
  }
}
