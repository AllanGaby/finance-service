import { SendMailProtocol, ListenUnreadMailProtocol } from '@/protocols/mail'
import { MailConfigModel, MailType } from '@/infrastructure/mail'
import { MemoryMailAdapter } from './memory'
import { ImapAdapter, ImapConfig } from './imap'
import { NodemailerAdapter } from './nodemailer'

export type MailWriteProtocols =
SendMailProtocol

export type MailReadProtocols =
ListenUnreadMailProtocol

export class MailFactory {
  public static GetMailWriteAdapter<AdapterType extends MailWriteProtocols>(config: MailConfigModel): MailWriteProtocols {
    if (config.type === MailType.Nodemailer) {
      return new NodemailerAdapter() as unknown as AdapterType
    }
    return MemoryMailAdapter.getInstance()
  }

  public static GetMailReadAdapter<AdapterType extends MailReadProtocols>(imapConfig: ImapConfig): MailReadProtocols {
    return new ImapAdapter(imapConfig) as unknown as AdapterType
  }
}
