import { ImapConfig } from '@/infrastructure/mail'
import { datatype, internet } from 'faker'

export const mockImapConfig = (): ImapConfig => ({
  user: internet.email(),
  password: internet.password(),
  host: internet.url(),
  port: datatype.number({ min: 100, max: 1000 }),
  tls: datatype.boolean(),
  connTimeout: datatype.number({ min: 1000, max: 5000 }),
  authTimeout: datatype.number({ min: 1000, max: 5000 })
})
