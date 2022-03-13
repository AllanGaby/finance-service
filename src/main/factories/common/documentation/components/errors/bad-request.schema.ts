import { DocumentationBodyModel, DocumentationContentType, DocumentationDataType } from '@/protocols/documentation'

export const BadRequestSchema: DocumentationBodyModel = {
  description: 'Requisição inválida - Maiores detalhes na mensagem de erro',
  content: {
    [DocumentationContentType.Json]: {
      schema: {
        type: DocumentationDataType.Array,
        $ref: '#/components/common/error'
      }
    }
  }
}
