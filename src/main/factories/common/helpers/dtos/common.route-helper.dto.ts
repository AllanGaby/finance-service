import { HttpMethod } from '@/protocols/http'
import { SuperAgentTest } from 'supertest'

export type CommonRouteHelperDTO = {
  agent: SuperAgentTest
  url: string
  method: HttpMethod
  field: string
  body?: Object
  cryptography?: boolean
  tokenField?: string
  publicKey?: string
}
