import { SettingsModel, mockVersionedEntityModel } from '@/domain/common'
import { datatype, internet } from 'faker'

export const mockSettingsModel = (): SettingsModel => ({
  ...mockVersionedEntityModel(),
  smtp_sender_email: internet.email(),
  smtp_sender_name: internet.userName(),
  smtp_auth_account: internet.email(),
  smtp_auth_password: internet.password(),
  smtp_service: internet.url(),
  enabled_send_mail: datatype.boolean(),
  google_callback_url: internet.url(),
  google_client_id: datatype.uuid(),
  google_client_secret: datatype.uuid(),
  google_scopes: datatype.uuid()
})
