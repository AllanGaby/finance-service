import { DocumentationSchemaModel, DocumentationDataType } from '@/protocols/documentation'

export const CreateOrUpdateModuleSchema: DocumentationSchemaModel = {
  type: DocumentationDataType.Object,
  description: 'Dados para o cadastro de um Módulo/Aplicação',
  properties: {
    name: {
      type: DocumentationDataType.String,
      description: 'Identificador amigável do módulo',
      required: true
    },
    description: {
      type: DocumentationDataType.String,
      description: 'Descrição do objetivo do módulo'
    },
    module_key: {
      type: DocumentationDataType.String,
      description: 'Identificador único do módulo(Controlado pelo usuário)',
      required: true
    }
  }
}
