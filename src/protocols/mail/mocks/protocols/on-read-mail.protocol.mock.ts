import { EmailModel } from '@/protocols/mail'

export class ReadMailSpy {
  static async onReadMail (mail: EmailModel): Promise<void> {
    return undefined
  }
}
