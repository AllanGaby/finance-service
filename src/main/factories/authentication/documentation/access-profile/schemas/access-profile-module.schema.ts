import { DocumentationSchemaModel, DocumentationDataType, DocumentationStringFormat } from '@/protocols/documentation'

export const AccessProfileSchema: DocumentationSchemaModel = {
  type: DocumentationDataType.Object,
  description: 'Perfil de acesso',
  properties: {
    id: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid,
      description: 'Identificador único do perfil de acesso(Gerado automaticamente)'
    },
    name: {
      type: DocumentationDataType.String,
      description: 'Nome do perfil de acesso',
      required: true
    },
    enabled: {
      type: DocumentationDataType.Boolean,
      description: 'Flag identificando se o módulo esta habilitado ou não',
      required: true
    },
    access_profile_key: {
      type: DocumentationDataType.String,
      description: 'Identificador único do perfil de acesso(Controlado pelo usuário)',
      required: true
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
    module_access_rules: {
      type: DocumentationDataType.Array,
      items: {
        $ref: '#/schemas/authentication/moduleAccessRule'
      }
    },
    created_at: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.DateTime,
      description: 'Data de cadastro do perfil de acesso'
    },
    updated_at: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.DateTime,
      description: 'Data de última atualização do perfil de acesso'
    }
  }
}
