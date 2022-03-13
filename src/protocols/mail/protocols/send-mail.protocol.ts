import { SMTPConfig, SendMailDTO } from '@/protocols/mail'

export interface SendMailProtocol {
  sendMail: (config: SMTPConfig, data: SendMailDTO) => Promise<void>
}
