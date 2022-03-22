import { DocumentationSchemaModel, DocumentationDataType, DocumentationStringFormat } from '@/protocols/documentation'

export const ModuleAccessRuleSchema: DocumentationSchemaModel = {
  type: DocumentationDataType.Object,
  description: 'Regra de acesso',
  properties: {
    id: {
      type: DocumentationDataType.String,
      description: 'Identificador único da regra de acesso(Gerado automaticamente)'
    },
    title: {
      type: DocumentationDataType.String,
      description: 'Título amigável da regra de acesso',
      required: true
    },
    description: {
      type: DocumentationDataType.String,
      description: 'Descrição detalhada da regra de acesso'
    },
    rule_key: {
      type: DocumentationDataType.String,
      description: 'Identificador único da regra de acesso(Controlado pelo usuário)',
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
    created_at: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.DateTime,
      description: 'Data de cadastro da regra de acesso'
    },
    updated_at: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.DateTime,
      description: 'Data de última atualização da regra de acesso'
    }
  }
}
