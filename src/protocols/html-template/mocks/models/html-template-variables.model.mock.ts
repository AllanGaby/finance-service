import { HtmlTemplateVariables } from '@/protocols/html-template'
import { database, datatype } from 'faker'

export const mockHtmlTemplateVariables = (): HtmlTemplateVariables => ({
  [database.column()]: datatype.uuid(),
  [database.column()]: datatype.uuid(),
  [database.column()]: datatype.uuid(),
  [database.column()]: datatype.uuid(),
  [database.column()]: datatype.uuid()
})
