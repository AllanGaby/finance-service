import { SendMailProtocol, ListenUnreadMailProtocol } from '@/protocols/mail'
import { ImapAdapter, ImapConfig } from './imap'
import { NodemailerAdapter } from './nodemailer'

export type MailWriteProtocols =
SendMailProtocol

export type MailReadProtocols =
ListenUnreadMailProtocol

export class MailFactory {
  public static GetMailWriteAdapter<AdapterType extends MailWriteProtocols>(): MailWriteProtocols {
    return new NodemailerAdapter() as unknown as AdapterType
  }

  public static GetMailReadAdapter<AdapterType extends MailReadProtocols>(imapConfig: ImapConfig): MailReadProtocols {
    return new ImapAdapter(imapConfig) as unknown as AdapterType
  }
}
