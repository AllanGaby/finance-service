import { DocumentationBodyModel, DocumentationContentType, DocumentationDataType } from '@/protocols/documentation'

export const UnprocessableEntitySchema: DocumentationBodyModel = {
  description: 'Existem parâmetros inválidos ou não informados',
  content: {
    [DocumentationContentType.Json]: {
      schema: {
        type: DocumentationDataType.Array,
        $ref: '#/components/common/error'
      }
    }
  }
}
