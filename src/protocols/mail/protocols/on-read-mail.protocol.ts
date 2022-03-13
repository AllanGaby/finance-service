import { EmailModel } from '@/protocols/mail'

export type OnReadMailProtocol = (mail: EmailModel) => Promise<void>
