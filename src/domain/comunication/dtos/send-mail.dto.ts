import { HtmlTemplateVariables } from '@/protocols/html-template'
import { ContactModel } from '@/protocols/mail'

export type SendMailDTO = {
  subject: string
  mailFilePath: string
  sendMailTo: ContactModel
  variables: HtmlTemplateVariables
}
