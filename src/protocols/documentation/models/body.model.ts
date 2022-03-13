import { DocumentationContentModel } from '@/protocols/documentation'

export type DocumentationBodyModel = {
  required?: boolean
  $ref?: string
  description?: string
  content?: DocumentationContentModel
}
