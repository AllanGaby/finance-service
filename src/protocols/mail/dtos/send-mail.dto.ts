import { ContactModel } from '@/protocols/mail'

export type SendMailDTO = {
  to: ContactModel
  sender: ContactModel
  subject: string
  content: string
}
