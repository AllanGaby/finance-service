import { SendMailProtocol, SendMailDTO, SMTPConfig } from '@/protocols/mail'
import nodemailer from 'nodemailer'

export class NodemailerAdapter implements SendMailProtocol {
  async sendMail (config: SMTPConfig, { sender, subject, to, content }: SendMailDTO): Promise<void> {
    const nodemailerTransport = nodemailer.createTransport(config)
    await nodemailerTransport.sendMail({
      sender: {
        address: sender.email,
        name: sender.name
      },
      subject,
      to: {
        address: to.email,
        name: to.name
      },
      html: content
    })
  }
}
