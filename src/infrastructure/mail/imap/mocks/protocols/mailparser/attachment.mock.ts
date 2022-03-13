import { Attachment } from 'mailparser'
import { mockContentType } from '@/protocols/mail'
import { datatype, system } from 'faker'

export const mockAttachment = (): Attachment => ({
  content: Buffer.from(datatype.string()),
  filename: system.fileName(),
  contentType: mockContentType(),
  checksum: undefined,
  contentDisposition: undefined,
  headerLines: undefined,
  headers: undefined,
  related: undefined,
  size: datatype.number(),
  type: undefined
})
