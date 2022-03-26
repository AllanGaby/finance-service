import { DocumentationSecurityType, DocumentationDataType } from '@/protocols/documentation'

export type DocumentationSecurityModel = {
  description?: string
  scheme: DocumentationSecurityType
  type: DocumentationDataType
}
