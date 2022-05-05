import { RefreshAccessTokenRequest } from '@/presentation/authentication'
import { datatype } from 'faker'

export const mockRefreshAccessTokenRequest = (): RefreshAccessTokenRequest => ({
  access_token: datatype.uuid()
})
