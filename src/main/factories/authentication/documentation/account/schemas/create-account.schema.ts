import { DocumentationSchemaModel, DocumentationDataType } from '@/protocols/documentation'

export const CreateAccountSchema: DocumentationSchemaModel = {
  type: DocumentationDataType.Object,
  description: 'Dados para o cadastro de uma conta de acesso',
  properties: {
    token: {
      type: DocumentationDataType.String,
      description: 'Token RSA gerado com as informações para a criação de uma conta de acesso',
      required: true
    }
  }
}
