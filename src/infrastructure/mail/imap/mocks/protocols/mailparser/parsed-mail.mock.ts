import { ParsedMail } from 'mailparser'
import { mockAttachment, mockAddressObject } from '@/infrastructure/mail'
import { datatype } from 'faker'

export const mockParsedMail = (): ParsedMail => ({
  text: datatype.string(),
  date: datatype.datetime(),
  subject: datatype.string(),
  from: mockAddressObject(),
  headers: undefined,
  html: undefined,
  headerLines: [],
  attachments: [
    mockAttachment(),
    mockAttachment(),
    mockAttachment(),
    mockAttachment()
  ]
})
