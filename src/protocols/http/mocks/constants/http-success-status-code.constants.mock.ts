import { HttpStatusCode } from '@/protocols/http'
import { random } from 'faker'

export const mockHttpSuccessStatusCode = (): HttpStatusCode => (
  random.arrayElement([
    HttpStatusCode.ok,
    HttpStatusCode.created,
    HttpStatusCode.noContent
  ])
)
