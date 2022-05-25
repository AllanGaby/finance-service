import { HttpRequest } from '@/protocols/http'
import { internet } from 'faker'

export const mockRequest = <BodyType = any, HeaderType = any, UserType = any>(
  body: BodyType,
  headers: HeaderType = undefined,
  user: UserType = undefined): HttpRequest<BodyType, HeaderType, any, any, UserType> => ({
    ip: internet.ip(),
    body,
    headers,
    user
  })
