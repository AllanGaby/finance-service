import { DocumentationSchemaModel, DocumentationDataType } from '@/protocols/documentation'

export const AccessSessionModuleSchema: DocumentationSchemaModel = {
  type: DocumentationDataType.Object,
  description: 'Informação dos módulos que a conta possui acesso',
  properties: {
    access_profile_key: {
      type: DocumentationDataType.String,
      description: 'Identificador amigável do perfil de acesso'
    },
    access_profile_rules: {
      type: DocumentationDataType.Array,
      items: {
        type: DocumentationDataType.String,
        description: 'Identificador único da regra de acesso(Controlado pelo usuário)'
      }
    }
  }
}
