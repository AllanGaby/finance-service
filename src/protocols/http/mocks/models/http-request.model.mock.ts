import { HttpRequest, mockHttpMethod } from '@/protocols/http'
import { internet, random } from 'faker'

export const mockHttpRequest = (): HttpRequest => ({
  url: internet.url(),
  method: mockHttpMethod(),
  body: random.objectElement(),
  headers: random.objectElement()
})
