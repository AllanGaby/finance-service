import {
  DocumentationDataType,
  DocumentationIntegerFormat,
  DocumentationNumberFormat,
  DocumentationStringFormat
} from '@/protocols/documentation'

export type DocumentationSchemaModel = {
  type?: DocumentationDataType
  schema?: DocumentationSchemaModel
  $ref?: string
  required?: boolean
  format?: DocumentationIntegerFormat | DocumentationNumberFormat | DocumentationStringFormat
  description?: string
  enum?: string[]
  items?: DocumentationSchemaModel
  nullable?: boolean
  properties?: {
    [name: string]: DocumentationSchemaModel
  }
  additionalProperties?: DocumentationSchemaModel
}
