import { HtmlTemplateParseProtocol } from '@/protocols/html-template'
import { EJSAdapter } from './ejs'

export class HtmlTemplateFactory {
  public static getHtmlTemplateAdapter (): HtmlTemplateParseProtocol {
    return new EJSAdapter()
  }
}
