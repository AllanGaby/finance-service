import 'module-alias/register'
import { ModuleAccessRuleModel } from '@/domain/authentication'
import { DefaultEntity } from '@/infrastructure/repositories'
import { ModuleEntity } from '@/infrastructure/authentication'
import { Entity, Column, OneToOne, JoinColumn, AfterLoad } from 'typeorm'

@Entity('module_access_rules')
export class ModuleAccessRuleEntity extends DefaultEntity implements ModuleAccessRuleModel {
  @Column()
  title: string

  @Column()
  description?: string

  @Column()
  rule_key: string

  @Column()
  module_id: string

  @OneToOne(() => ModuleEntity)
  @JoinColumn({
    name: 'module_id'
  })
  module?: ModuleEntity

  module_key?: string
  module_name?: string

  @AfterLoad()
  setModuleData? (): void {
    if (this.module) {
      this.module_key = this.module.module_key
      this.module_name = this.module.name
    }
  }
}
