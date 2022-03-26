import { HttpMethod } from '@/protocols/http'
import { SuperAgentTest } from 'supertest'

export type GetResponseRouteHelperDTO = {
  agent: SuperAgentTest
  url: string
  method: HttpMethod
  body?: Object
  accessToken?: string
  accessTokenName?: string
}
