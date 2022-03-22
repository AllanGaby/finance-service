import { DocumentationSchemaModel, DocumentationDataType, DocumentationStringFormat } from '@/protocols/documentation'

export const AccessSessionSchema: DocumentationSchemaModel = {
  type: DocumentationDataType.Object,
  description: 'Sessão de acesso ao serviço de autenticação',
  properties: {
    session_id: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid,
      description: 'Identificador único da sessão(Gerado automaticamente)'
    },
    account_id: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid,
      description: 'Identificador único da conta de acesso'
    },
    account_name: {
      type: DocumentationDataType.String,
      description: 'Nome da conta de acesso'
    },
    access_token: {
      type: DocumentationDataType.String,
      description: 'Token de acesso'
    },
    refresh_token: {
      type: DocumentationDataType.String,
      description: 'Token de recuperação de acesso'
    }
  }
}
