import { SMTPConfig } from '@/protocols/mail'
import { datatype, internet } from 'faker'

export const mockSMTPConfig = (): SMTPConfig => ({
  host: internet.url(),
  port: datatype.number(99999),
  secure: datatype.boolean(),
  service: datatype.string(),
  auth: {
    user: internet.email(),
    pass: internet.password()
  }
})
