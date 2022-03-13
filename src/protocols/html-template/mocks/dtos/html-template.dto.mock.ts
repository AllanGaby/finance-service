import { HtmlTemplateDTO, mockHtmlTemplateVariables } from '@/protocols/html-template'
import { system } from 'faker'

export const mockHtmlTemplateDTO = (): HtmlTemplateDTO => ({
  filePath: system.filePath(),
  variables: mockHtmlTemplateVariables()
})
