import { SendMailProtocol, SendMailDTO, SMTPConfig } from '@/protocols/mail'

export class SendMailProtocolSpy implements SendMailProtocol {
  params: SendMailDTO
  config: SMTPConfig

  async sendMail (config: SMTPConfig, params: SendMailDTO): Promise<void> {
    this.config = config
    this.params = params
  }
}
