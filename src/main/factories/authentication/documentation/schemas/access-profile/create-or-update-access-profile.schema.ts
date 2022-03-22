import { DocumentationSchemaModel, DocumentationDataType, DocumentationStringFormat } from '@/protocols/documentation'

export const CreateOrUpdateAccessProfileSchema: DocumentationSchemaModel = {
  type: DocumentationDataType.Object,
  description: 'Dados para o cadastro/atualização do perfil de acesso',
  properties: {
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
    rules_id: {
      type: DocumentationDataType.Array,
      required: true,
      items: {
        type: DocumentationDataType.String,
        format: DocumentationStringFormat.Uuid,
        description: 'Identificador único da regra de acesso'
      }
    }
  }
}
