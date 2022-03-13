import { Request } from 'express'
import { random } from 'faker'

export const mockPartialExpressRequest = (
  body: any = random.objectElement(),
  params: any = random.objectElement(),
  headers: any = random.objectElement(),
  queryParams: any = random.objectElement()
): Partial<Request> => ({
  body,
  params,
  headers,
  query: queryParams
})
