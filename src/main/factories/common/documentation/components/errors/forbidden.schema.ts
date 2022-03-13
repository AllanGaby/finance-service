import { DocumentationBodyModel, DocumentationContentType, DocumentationDataType } from '@/protocols/documentation'

export const ForbiddenSchema: DocumentationBodyModel = {
  description: 'Requisição não permitida - Maiores detalhes na mensagem de erro',
  content: {
    [DocumentationContentType.Json]: {
      schema: {
        type: DocumentationDataType.Array,
        $ref: '#/components/common/error'
      }
    }
  }
}
