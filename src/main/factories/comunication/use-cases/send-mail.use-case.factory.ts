import { SendMailUseCase } from '@/domain/comunication'
import { RemoteSendMailUseCase } from '@/data/comunication/use-cases'
import { HtmlTemplateFactory } from '@/infrastructure/html-template'
import { MailFactory } from '@/infrastructure/mail'

export const makeSendMailUseCase = (): SendMailUseCase =>
  new RemoteSendMailUseCase(
    HtmlTemplateFactory.getHtmlTemplateAdapter(),
    MailFactory.GetMailWriteAdapter()
  )
