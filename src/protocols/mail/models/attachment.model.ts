import { ContentType } from '@/protocols/mail'

export type AttachmentModel = {
  contentType: ContentType
  fileName: string
  fileContent: Buffer
}
