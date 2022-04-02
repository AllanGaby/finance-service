import { SendMailUseCase } from '@/domain/comunication'
import { RemoteSendMailUseCase } from '@/data/comunication/use-cases'
import { HtmlTemplateFactory } from '@/infrastructure/html-template'
import { MailFactory, MailConfigModel } from '@/infrastructure/mail'

export type SendMailUseCaseProps = {
  mail: MailConfigModel
}

export const makeSendMailUseCase = (props: SendMailUseCaseProps): SendMailUseCase =>
  new RemoteSendMailUseCase(
    HtmlTemplateFactory.getHtmlTemplateAdapter(),
    MailFactory.GetMailWriteAdapter(props.mail)
  )
