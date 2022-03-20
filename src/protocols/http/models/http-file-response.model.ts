import { HttpContentType } from '@/protocols/http'

export type HttpFileResponse = {
  fileContent: ArrayBuffer
  contentType: HttpContentType
}
