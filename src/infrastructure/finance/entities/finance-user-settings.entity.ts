import 'module-alias/register'
import { FinanceUserSettingsModel } from '@/domain/finance'
import { AccountEntity } from '@/infrastructure/authentication'
import { DefaultEntity } from '@/infrastructure/repositories'
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm'

@Entity('finance_user_settings')
export class FinanceUserSettingsEntity extends DefaultEntity implements FinanceUserSettingsModel {
  @Column()
  account_id: string

  @Column()
  months_to_predict: number

  @OneToOne(() => AccountEntity)
  @JoinColumn({
    name: 'account_id'
  })
  account?: AccountEntity
}
