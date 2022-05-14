import { DocumentationSchemaModel, DocumentationDataType, DocumentationStringFormat } from '@/protocols/documentation'

export const CreateRequestRecoverPasswordSchema: DocumentationSchemaModel = {
  type: DocumentationDataType.Object,
  description: 'Dados para a recuperação de senha do usuário',
  properties: {
    email: {
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Email,
      description: 'E-mail de acesso do usuário',
      required: true
    }
  }
}
