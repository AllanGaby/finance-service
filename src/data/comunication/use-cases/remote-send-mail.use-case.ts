import { SendMailUseCase, SendMailDTO } from '@/domain/comunication'
import { SettingsModel } from '@/domain/common'
import { HtmlTemplateParseProtocol } from '@/protocols/html-template'
import { SendMailProtocol } from '@/protocols/mail'

export class RemoteSendMailUseCase implements SendMailUseCase {
  constructor (
    private readonly htmlTemplateParseAdapter: HtmlTemplateParseProtocol,
    private readonly sendMailAdapter: SendMailProtocol
  ) {}

  async sendMail ({ mailFilePath, variables, sendMailTo, subject }: SendMailDTO, authenticationSettings: SettingsModel): Promise<void> {
    const contentMail = await this.htmlTemplateParseAdapter.parse({
      filePath: mailFilePath,
      variables
    })
    await this.sendMailAdapter.sendMail({
      service: authenticationSettings.smtp_service,
      auth: {
        user: authenticationSettings.smtp_auth_account,
        pass: authenticationSettings.smtp_auth_password
      }
    }, {
      content: contentMail,
      to: sendMailTo,
      subject,
      sender: {
        name: authenticationSettings.smtp_sender_name,
        email: authenticationSettings.smtp_sender_email
      }
    })
    return undefined
  }
}
