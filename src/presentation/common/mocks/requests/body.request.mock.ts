import { HttpRequest } from '@/protocols/http'
import { internet } from 'faker'

export const mockRequest = <BodyType = any>(body: BodyType): HttpRequest<BodyType> => ({
  ip: internet.ip(),
  body
})
