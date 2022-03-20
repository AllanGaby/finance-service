import 'module-alias/register'
import { AccountAccessModuleModel } from '@/domain/authentication'
import { DefaultEntity } from '@/infrastructure/repositories'
import { ModuleEntity, AccessProfileEntity, AccountEntity } from '@/infrastructure/authentication'
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm'

@Entity('account_access_modules')
export class AccountAccessModuleEntity extends DefaultEntity implements AccountAccessModuleModel {
  @Column()
  account_id: string

  @OneToOne(() => AccountEntity)
  @JoinColumn({
    name: 'account_id'
  })
  account: AccountEntity

  @Column()
  access_profile_id: string

  @OneToOne(() => AccessProfileEntity)
  @JoinColumn({
    name: 'access_profile_id'
  })
  access_profile: AccessProfileEntity

  @Column()
  module_id: string

  @OneToOne(() => ModuleEntity)
  @JoinColumn({
    name: 'module_id'
  })
  module?: ModuleEntity
}
