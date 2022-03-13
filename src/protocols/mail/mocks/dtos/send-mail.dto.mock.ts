import { SendMailDTO, mockContactModel } from '@/protocols/mail'
import { datatype } from 'faker'

export const mockSendMailDTO = (): SendMailDTO => ({
  to: mockContactModel(),
  sender: mockContactModel(),
  subject: datatype.string(),
  content: datatype.string()
})
