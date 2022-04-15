import { HttpContentType } from '@/protocols/http'
import { random } from 'faker'

export const mockHttpContentType = (): HttpContentType =>
  random.arrayElement(Object.values(HttpContentType))
