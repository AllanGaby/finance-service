import { HtmlTemplateParseProtocol, HtmlTemplateDTO } from '@/protocols/html-template'
import { datatype } from 'faker'

export class HtmlTemplateParseSpy implements HtmlTemplateParseProtocol {
  params: HtmlTemplateDTO
  html: string = datatype.uuid()

  async parse (params: HtmlTemplateDTO): Promise<string> {
    this.params = params
    return this.html
  }
}
