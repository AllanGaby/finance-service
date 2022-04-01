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
}
