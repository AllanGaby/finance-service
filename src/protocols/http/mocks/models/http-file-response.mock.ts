import { HttpFileResponse, mockHttpContentType } from '@/protocols/http'
import { datatype } from 'faker'

export const mockHttpFileResponse = (): HttpFileResponse => ({
  fileContent: Buffer.from(datatype.uuid()),
  contentType: mockHttpContentType()
})
