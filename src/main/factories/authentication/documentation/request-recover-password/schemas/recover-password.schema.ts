import { DocumentationSchemaModel, DocumentationDataType } from '@/protocols/documentation'

export const RecoverPasswordSchema: DocumentationSchemaModel = {
  type: DocumentationDataType.Object,
  description: 'Dados para a atualização da senha do usuário',
  properties: {
    token: {
      type: DocumentationDataType.String,
      description: 'Token RSA gerado com as informações para a atualização da senha do usuário',
      required: true
    }
  }
}
