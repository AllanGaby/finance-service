import { DocumentationSchemaModel, DocumentationDataType, DocumentationStringFormat } from '@/protocols/documentation'

export const AccountSchema: DocumentationSchemaModel = {
  type: DocumentationDataType.Object,
  description: 'Conta de acesso ao serviço de autenticação',
  properties: {
    id: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid,
      description: 'Identificador único da conta de acesso(Gerado automaticamente)'
    },
    name: {
      type: DocumentationDataType.String,
      description: 'Nome pelo qual o usuário será identificado na aplicação'
    },
    email: {
      type: DocumentationDataType.String,
      description: 'Endereço de e-mail do usuário, usado para todas as comunicações da aplicação com o usuário'
    },
    identification: {
      type: DocumentationDataType.String,
      description: 'Identificador único da conta de acesso(Controlado pelo usuário)'
    },
    password: {
      type: DocumentationDataType.String,
      description: 'Hash da senha de acesso'
    },
    account_hash: {
      type: DocumentationDataType.String,
      description: 'Hash de validação das informações do usuário'
    },
    modules: {
      $ref: '#/schemas/authentication/accountAccessModule'
    },
    created_at: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.DateTime,
      description: 'Data de cadastro da conta de acesso'
    },
    updated_at: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.DateTime,
      description: 'Data de última atualização da conta de acesso'
    }
  }
}
