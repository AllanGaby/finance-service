import { VersionedEntityModel } from '@/domain/common'

export type SettingsModel = VersionedEntityModel & {
  smtp_sender_email?: string
  smtp_sender_name?: string
  smtp_auth_account?: string
  smtp_auth_password?: string
  smtp_service?: string
  enabled_send_mail?: boolean
  google_client_id?: string
  google_client_secret?: string
  google_callback_url?: string
  google_scopes?: string
}
