import { HttpRequest } from '@/protocols/http'
import { AccessSessionHeaderRequest } from '@/presentation/authentication'
import { AccessSessionPayloadModel, mockAccessSessionPayloadModel } from '@/domain/authentication'

export const mockAccessSessionHeaderRequest = <BodyType = Object>
  (accessSession: AccessSessionPayloadModel = mockAccessSessionPayloadModel(),
    body: BodyType = undefined
  ): HttpRequest<BodyType, AccessSessionHeaderRequest> => ({
    body,
    headers: {
      access_session: accessSession
    }
  })
