import 'module-alias/register'
import { AccessProfileModel } from '@/domain/authentication'
import { DefaultEntity } from '@/infrastructure/repositories'
import { ModuleEntity, ModuleAccessRuleEntity } from '@/infrastructure/authentication'
import { Entity, Column, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm'

@Entity('access_profiles')
export class AccessProfileEntity extends DefaultEntity implements AccessProfileModel {
  @Column()
  name: string

  @Column()
  enabled: boolean

  @Column()
  access_profile_key: string

  @Column()
  module_id: string

  @OneToOne(() => ModuleEntity)
  @JoinColumn({
    name: 'module_id'
  })
  module?: ModuleEntity

  @ManyToMany(() => ModuleAccessRuleEntity)
  @JoinTable({
    name: 'access_profile_rules',
    inverseJoinColumn: {
      name: 'module_access_rule_id',
      referencedColumnName: 'id'
    },
    joinColumn: {
      name: 'access_profile_id',
      referencedColumnName: 'id'
    }
  })
  module_access_rules?: ModuleAccessRuleEntity[]
}
