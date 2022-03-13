import { AttachmentModel, ContentType, ListenUnreadMailProtocol, OnReadMailProtocol } from '@/protocols/mail'
import { ImapConfig } from '@/infrastructure/mail'
import Imap, { ImapMessage } from 'imap'
import { simpleParser, Source } from 'mailparser'

export class ImapAdapter implements ListenUnreadMailProtocol {
  public imapClient: Imap

  constructor (
    private readonly imapConfig: ImapConfig
  ) {
    this.imapClient = new Imap(this.imapConfig)
  }

  async ready (unreadMailsSince: Date, onReadMail: OnReadMailProtocol): Promise<void> {
    this.imapClient.once('ready', async () => this.onOpenBox(unreadMailsSince, onReadMail))
  }

  async onOpenBox (unreadMailsSince: Date, onReadMail: OnReadMailProtocol): Promise<void> {
    this.imapClient.openBox('INBOX', false, async () => this.onSearchMail(unreadMailsSince, onReadMail))
  }

  async onSearchMail (unreadMailsSince: Date, onReadMail: OnReadMailProtocol): Promise<void> {
    this.imapClient.search(['UNSEEN', ['SINCE', unreadMailsSince]], async (_err: Error, mailsIdList: number[]) => this.onFilterMails(_err, mailsIdList, onReadMail))
  }

  async onFilterMails (_err: Error, mailsIdList: number[], onReadMail: OnReadMailProtocol): Promise<void> {
    if (mailsIdList.length === 0) {
      this.imapClient.end()
      return
    }
    const mailList = this.imapClient.fetch(mailsIdList, { bodies: '' })
    mailList.on('message', async (message: ImapMessage) => this.onReadMessage(message, onReadMail))
  }

  async onReadMessage (message: ImapMessage, onReadMail: OnReadMailProtocol): Promise<void> {
    message.on('body', async (mail: Source) => this.onReadBody(mail, onReadMail))
    message.on('end', () => {
      this.imapClient.end()
    })
  }

  async onReadBody (mail: Source, onReadMail: OnReadMailProtocol): Promise<void> {
    const parsedMail = await simpleParser(mail)
    onReadMail({
      content: parsedMail.text,
      date: parsedMail.date,
      from: parsedMail.from.value.map<string>(address => address.address).join(','),
      subject: parsedMail.subject,
      attachments: parsedMail.attachments.map<AttachmentModel>(attachment => ({
        contentType: attachment.contentType as ContentType,
        fileContent: Buffer.from(attachment.content),
        fileName: attachment.filename
      }))
    })
  }

  async listenUnreadMail (onReadMail: OnReadMailProtocol, unreadMailsSince: Date = new Date()): Promise<void> {
    this.ready(unreadMailsSince, onReadMail)
    this.imapClient.connect()
  }
}
