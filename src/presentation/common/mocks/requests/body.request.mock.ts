import { HttpRequest } from '@/protocols/http'

export const mockRequest = <BodyType = any>(body: BodyType): HttpRequest<BodyType> => ({
  body
})
