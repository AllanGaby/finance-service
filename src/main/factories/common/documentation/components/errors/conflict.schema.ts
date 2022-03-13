import { DocumentationBodyModel, DocumentationContentType, DocumentationDataType } from '@/protocols/documentation'

export const ConflictSchema: DocumentationBodyModel = {
  description: 'A requisição infringe uma regra da aplicação',
  content: {
    [DocumentationContentType.Json]: {
      schema: {
        type: DocumentationDataType.Array,
        $ref: '#/components/common/error'
      }
    }
  }
}
