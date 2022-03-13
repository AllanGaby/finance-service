import { CommonIdParamsRequest } from '@/presentation/common/requests'
import { HttpRequest } from '@/protocols/http'
import { datatype } from 'faker'

export const mockCommonIdParamsRequest = (): HttpRequest<any, any, any, CommonIdParamsRequest> => ({
  params: {
    id: datatype.uuid()
  }
})
