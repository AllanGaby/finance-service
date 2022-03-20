import { mockRequest, CreateBatchEntityRequest } from '@/presentation/common'
import { HttpRequest } from '@/protocols/http'
import { random } from 'faker'

export const mockCreateBatchEntityRequest = (): HttpRequest<CreateBatchEntityRequest<object>> =>
  mockRequest<CreateBatchEntityRequest<object>>([
    random.objectElement<object>(),
    random.objectElement<object>(),
    random.objectElement<object>(),
    random.objectElement<object>()
  ])
