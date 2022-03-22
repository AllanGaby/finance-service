import { DocumentationSchemaModel, DocumentationDataType } from '@/protocols/documentation'

export const CreateAccessSessionSchema: DocumentationSchemaModel = {
  type: DocumentationDataType.Object,
  description: 'Dados para a criação de uma sessão de acesso',
  properties: {
    token: {
      type: DocumentationDataType.String,
      description: 'Token RSA gerado com as informações para a criação de uma sessão de acesso',
      required: true
    }
  }
}
