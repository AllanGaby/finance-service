import { HtmlTemplateDTO } from '@/protocols/html-template'

export interface HtmlTemplateParseProtocol {
  parse: (params: HtmlTemplateDTO) => Promise<string>
}
