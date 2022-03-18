import 'module-alias/register'
import { AccessProfileRuleModel } from '@/domain/authentication'
import { DefaultEntity } from '@/infrastructure/repositories'
import { ModuleAccessRuleEntity, AccessProfileEntity } from '@/infrastructure/authentication'
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm'

@Entity('access_profile_rules')
export class AccessProfileRuleEntity extends DefaultEntity implements AccessProfileRuleModel {
  @Column()
  access_profile_id: string

  @OneToOne(() => AccessProfileEntity)
  @JoinColumn({
    name: 'access_profile_id'
  })
  access_profile?: AccessProfileEntity

  @Column()
  module_access_rule_id: string

  @OneToOne(() => ModuleAccessRuleEntity)
  @JoinColumn({
    name: 'module_access_rule_id'
  })
  module_access_rule?: ModuleAccessRuleEntity
}
