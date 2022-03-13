import { HttpMethod } from '@/protocols/http'
import { random } from 'faker'

export const mockHttpMethod = (): HttpMethod => random.arrayElement(Object.values(HttpMethod))
