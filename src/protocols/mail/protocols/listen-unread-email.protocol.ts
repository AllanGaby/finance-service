import { OnReadMailProtocol } from '@/protocols/mail'

export interface ListenUnreadMailProtocol {
  listenUnreadMail: (onReadMail: OnReadMailProtocol, unreadMailsSince?: Date) => Promise<void>
}
