import { DocumentationSchemaModel, DocumentationDataType, DocumentationStringFormat } from '@/protocols/documentation'

export const AccountAccessModuleSchema: DocumentationSchemaModel = {
  type: DocumentationDataType.Object,
  description: 'Perfil de acesso do usuário para cada Módulo/Aplicação',
  properties: {
    id: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid,
      description: 'Identificador único do acesso ao Módulo/Aplicação(Gerado automaticamente)'
    },
    account_id: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid,
      description: 'Identificador único da conta de acesso'
    },
    account: {
      $ref: '#/schemas/authentication/account'
    },
    account_profile_id: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid,
      description: 'Identificador do perfil de acesso',
      required: true
    },
    account_profile: {
      $ref: '#/schemas/authentication/accessProfile'
    },
    module_id: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid,
      description: 'Identificador único do Módulo/Aplicação',
      required: true
    },
    module: {
      $ref: '#/schemas/authentication/module'
    },
    created_at: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.DateTime,
      description: 'Data de cadastro do perfil de acesso para o usuário'
    },
    updated_at: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.DateTime,
      description: 'Data de última atualização do perfil de acesso para o usuário'
    }
  }
}
