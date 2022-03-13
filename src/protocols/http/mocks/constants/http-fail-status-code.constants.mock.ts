import { HttpStatusCode } from '@/protocols/http'
import { random } from 'faker'

export const mockHttpFailStatusCode = (): HttpStatusCode => (
  random.arrayElement([
    HttpStatusCode.badRequest,
    HttpStatusCode.unauthorized,
    HttpStatusCode.forbidden,
    HttpStatusCode.notFound,
    HttpStatusCode.conflict,
    HttpStatusCode.unprocessableEntity
  ])
)
