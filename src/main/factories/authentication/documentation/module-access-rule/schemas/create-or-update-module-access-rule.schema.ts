import { DocumentationSchemaModel, DocumentationDataType, DocumentationStringFormat } from '@/protocols/documentation'

export const CreateOrUpdateModuleAccessRuleSchema: DocumentationSchemaModel = {
  type: DocumentationDataType.Object,
  description: 'Dados para o cadastro/alteração de um regra de acesso para o Módulo/Aplicação',
  properties: {
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
    }
  }
}
