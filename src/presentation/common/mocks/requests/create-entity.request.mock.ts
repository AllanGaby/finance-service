import { mockRequest, CreateEntityRequest } from '@/presentation/common'
import { HttpRequest } from '@/protocols/http'
import { random } from 'faker'

export const mockCreateEntityRequest = (): HttpRequest<CreateEntityRequest<object>> =>
  mockRequest<CreateEntityRequest<object>>(random.objectElement<object>())
