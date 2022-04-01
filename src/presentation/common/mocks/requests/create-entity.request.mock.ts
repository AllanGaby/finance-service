import { mockSettingsModel } from '@/domain/common'
import { mockRequest, CreateEntityRequest, SettingsHeaderRequest } from '@/presentation/common'
import { HttpRequest } from '@/protocols/http'
import { random } from 'faker'

export const mockCreateEntityRequest = (): HttpRequest<CreateEntityRequest<object>, SettingsHeaderRequest> =>
  mockRequest<CreateEntityRequest<object>, SettingsHeaderRequest>(random.objectElement<object>(), {
    settings: mockSettingsModel()
  })
