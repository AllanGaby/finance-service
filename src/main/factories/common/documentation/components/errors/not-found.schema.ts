import { DocumentationBodyModel, DocumentationContentType, DocumentationDataType } from '@/protocols/documentation'

export const NotFoundSchema: DocumentationBodyModel = {
  description: 'Rota inválida ou não existe',
  content: {
    [DocumentationContentType.Json]: {
      schema: {
        type: DocumentationDataType.Array,
        $ref: '#/components/common/error'
      }
    }
  }
}
