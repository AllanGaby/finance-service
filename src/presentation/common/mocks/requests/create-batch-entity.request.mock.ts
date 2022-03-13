import { CreateBatchEntityRequest } from '@/presentation/common/requests'
import { HttpRequest } from '@/protocols/http'
import { random } from 'faker'

export const mockCreateBatchEntityRequest = (): HttpRequest<CreateBatchEntityRequest<object>> => ({
  body: [
    random.objectElement<object>(),
    random.objectElement<object>(),
    random.objectElement<object>(),
    random.objectElement<object>()
  ]
})
