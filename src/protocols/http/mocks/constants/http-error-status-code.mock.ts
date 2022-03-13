import { HttpStatusCode } from '@/protocols/http'
import { random } from 'faker'

export const mockErrorStatusCode = (): HttpStatusCode => random.arrayElement([
  HttpStatusCode.badRequest,
  HttpStatusCode.forbidden,
  HttpStatusCode.serverError
])
