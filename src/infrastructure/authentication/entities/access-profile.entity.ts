import 'module-alias/register'
import { AccessProfileModel } from '@/domain/authentication'
import { DefaultEntity } from '@/infrastructure/repositories'
import { ModuleEntity } from '@/infrastructure/authentication'
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm'

@Entity('access_profiles')
export class AccessProfileEntity extends DefaultEntity implements AccessProfileModel {
  @Column()
  name: string

  @Column()
  enabled: boolean

  @Column()
  module_id: string

  @OneToOne(() => ModuleEntity)
  @JoinColumn({
    name: 'module_id'
  })
  module?: ModuleEntity
}
