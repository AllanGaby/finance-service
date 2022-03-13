import { AttachmentModel } from '@/protocols/mail'

export type EmailModel = {
  date: Date
  from: string
  subject: string
  content: string
  attachments?: AttachmentModel[]
}
