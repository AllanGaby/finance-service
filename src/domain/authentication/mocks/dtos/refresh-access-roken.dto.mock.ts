import { RefreshAccessTokenDTO } from '@/domain/authentication'
import { datatype, internet } from 'faker'

export const mockRefreshAccessTokenDTO = (): RefreshAccessTokenDTO => ({
  access_token: datatype.uuid(),
  ip: internet.ip()
})
