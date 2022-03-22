import { DocumentationSchemaModel, DocumentationDataType, DocumentationStringFormat } from '@/protocols/documentation'

export const CreateOrUpdateAccountAccessModuleSchema: DocumentationSchemaModel = {
  type: DocumentationDataType.Object,
  description: 'Dados para o cadastro/atualização do perfil de acesso para um usuário',
  properties: {
    account_id: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid,
      description: 'Identificador único da conta de acesso',
      required: true
    },
    account_profile_id: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid,
      description: 'Identificador do perfil de acesso',
      required: true
    },
    module_id: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid,
      description: 'Identificador único do Módulo/Aplicação',
      required: true
    }
  }
}
