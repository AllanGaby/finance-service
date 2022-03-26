import 'module-alias/register'
import { AccessSessionModel, AccessSessionModuleModel } from '@/domain/authentication'
import { DefaultEntity } from '@/infrastructure/repositories'
import { AccountEntity } from '@/infrastructure/authentication'
import { Entity, Column, AfterLoad, OneToOne, JoinColumn, DeleteDateColumn } from 'typeorm'

@Entity('access_sessions')
export class AccessSessionEntity extends DefaultEntity implements AccessSessionModel {
  @Column()
  account_id: string

  @OneToOne(() => AccountEntity)
  @JoinColumn({
    name: 'account_id'
  })
  account: AccountEntity

  @Column()
  access_session_modules: string

  @Column()
  ip: string

  modules: AccessSessionModuleModel

  @AfterLoad()
  parseModules? (): void {
    this.modules = JSON.parse(this.access_session_modules)
  }

  @DeleteDateColumn()
  deleted_at: Date
}
