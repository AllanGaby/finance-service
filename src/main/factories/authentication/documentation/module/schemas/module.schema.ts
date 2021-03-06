import { DocumentationSchemaModel, DocumentationDataType, DocumentationStringFormat } from '@/protocols/documentation'

export const ModuleSchema: DocumentationSchemaModel = {
  type: DocumentationDataType.Object,
  description: 'Módulo/Aplicação que fará o controle de acesso pelo serviço de autenticação',
  properties: {
    id: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid,
      description: 'Identificador único do módulo(Gerado automaticamente)'
    },
    name: {
      type: DocumentationDataType.String,
      description: 'Identificador amigável do módulo'
    },
    description: {
      type: DocumentationDataType.String,
      description: 'Descrição do objetivo do módulo'
    },
    module_key: {
      type: DocumentationDataType.String,
      description: 'Identificador único do módulo(Controlado pelo usuário)'
    },
    enabled: {
      type: DocumentationDataType.Boolean,
      description: 'Flag identificando se o módulo esta habilitado ou não'
    },
    access_rules: {
      type: DocumentationDataType.Array,
      items: {
        $ref: '#/schemas/authentication/moduleAccessRule'
      }
    },
    created_at: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.DateTime,
      description: 'Data de cadastro do módulo'
    },
    updated_at: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.DateTime,
      description: 'Data de última atualização do módulo'
    }
  }
}
