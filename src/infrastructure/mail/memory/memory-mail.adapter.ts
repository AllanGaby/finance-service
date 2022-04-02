import { SendMailProtocol, SendMailDTO, SMTPConfig } from '@/protocols/mail'

export class MemoryMailAdapter implements SendMailProtocol {
  public static instance: MemoryMailAdapter

  public static getInstance (): MemoryMailAdapter {
    if (!MemoryMailAdapter.instance) {
      MemoryMailAdapter.instance = new MemoryMailAdapter()
    }
    return MemoryMailAdapter.instance
  }

  async sendMail (config: SMTPConfig, { sender, subject, to, content }: SendMailDTO): Promise<void> {
  }
}
