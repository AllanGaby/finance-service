import { DocumentationSchemaModel, DocumentationDataType } from '@/protocols/documentation'

export const UpdateAccountSchema: DocumentationSchemaModel = {
  type: DocumentationDataType.Object,
  description: 'Dados para a atualização do cadastro de uma conta de acesso',
  properties: {
    name: {
      type: DocumentationDataType.String,
      description: 'Nome do usuário da conta de acesso',
      required: true
    }
  }
}
