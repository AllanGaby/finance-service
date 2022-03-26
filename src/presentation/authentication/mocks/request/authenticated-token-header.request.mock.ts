import { HttpRequest } from '@/protocols/http'
import { AuthenticatedTokenHeaderRequest } from '@/presentation/authentication'
import { datatype } from 'faker'

export const mockAuthenticatedTokenHeaderRequest = <BodyType = Object>
  (accessTokenName: string,
    token: string = datatype.uuid(),
    body: BodyType = undefined): HttpRequest<BodyType, AuthenticatedTokenHeaderRequest> => ({
    body,
    headers: {
      [accessTokenName]: token
    }
  })
