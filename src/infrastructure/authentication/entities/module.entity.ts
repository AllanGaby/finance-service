import 'module-alias/register'
import { ModuleModel } from '@/domain/authentication'
import { DefaultEntity } from '@/infrastructure/repositories'
import { ModuleAccessRuleEntity } from '@/infrastructure/authentication'
import { Entity, Column, OneToMany } from 'typeorm'

@Entity('modules')
export class ModuleEntity extends DefaultEntity implements ModuleModel {
  @Column()
  name: string

  @Column()
  description?: string

  @Column()
  module_key: string

  @Column()
  enabled: boolean

  @OneToMany(() => ModuleAccessRuleEntity, accessRule => accessRule.module)
  access_rules?: ModuleAccessRuleEntity[]
}
