import { CreateEntityRequest } from '@/presentation/common/requests'
import { HttpRequest } from '@/protocols/http'
import { random } from 'faker'

export const mockCreateEntityRequest = (): HttpRequest<CreateEntityRequest<object>> => ({
  body: random.objectElement<object>()
})
