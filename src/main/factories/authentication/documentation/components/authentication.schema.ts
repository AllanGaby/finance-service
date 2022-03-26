import { DocumentationSecurityModel, DocumentationSecurityType, DocumentationDataType } from '@/protocols/documentation'

export const AuthenticationSchema: DocumentationSecurityModel = {
  description: 'Modo de autenticação',
  scheme: DocumentationSecurityType.BearerToken,
  type: DocumentationDataType.Http
}
