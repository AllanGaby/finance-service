import { HttpRequest } from '@/protocols/http'
import { internet } from 'faker'

export const mockRequest = <BodyType = any, HeaderType = any>(body: BodyType, headers: HeaderType = undefined): HttpRequest<BodyType, HeaderType> => ({
  ip: internet.ip(),
  body,
  headers
})
