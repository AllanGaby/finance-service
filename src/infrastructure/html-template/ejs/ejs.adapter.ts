import { HtmlTemplateParseProtocol, HtmlTemplateDTO } from '@/protocols/html-template'
import EJS from 'ejs'
import fs from 'fs'

export class EJSAdapter implements HtmlTemplateParseProtocol {
  async parse ({ filePath, variables }: HtmlTemplateDTO): Promise<string> {
    const templateContent = await fs.promises.readFile(filePath, {
      encoding: 'utf-8'
    })
    return EJS.render(templateContent, variables)
  }
}
