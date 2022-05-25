import 'module-alias/register'
import { SettingsModel } from '@/domain/common'
import { VersionedDefaultEntity } from '@/infrastructure/repositories'
import { Entity, Column } from 'typeorm'

@Entity('authentication_settings')
export class SettingsEntity extends VersionedDefaultEntity implements SettingsModel {
  @Column()
  smtp_sender_email?: string

  @Column()
  smtp_sender_name?: string

  @Column()
  smtp_auth_account?: string

  @Column()
  smtp_auth_password?: string

  @Column()
  smtp_service?: string

  @Column()
  enabled_send_mail?: boolean

  @Column()
  google_callback_url?: string

  @Column()
  google_client_id?: string

  @Column()
  google_client_secret?: string

  @Column()
  google_scopes?: string
}
