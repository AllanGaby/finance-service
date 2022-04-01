import { mockHtmlTemplateVariables } from '@/protocols/html-template'
import { mockContactModel } from '@/protocols/mail'
import { SendMailDTO } from '@/domain/comunication'
import { datatype, system } from 'faker'

export const mockSendMailDTO = (): SendMailDTO => ({
  subject: datatype.string(),
  mailFilePath: system.filePath(),
  sendMailTo: mockContactModel(),
  variables: mockHtmlTemplateVariables()
})
