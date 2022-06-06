import 'module-alias/register'
import { TransactionTagModel } from '@/domain/finance'
import { AccountEntity } from '@/infrastructure/authentication'
import { DefaultEntity } from '@/infrastructure/repositories'
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm'

@Entity('transaction_tags')
export class TransactionTagEntity extends DefaultEntity implements TransactionTagModel {
  @Column()
  account_id: string

  @Column()
  name: string

  @OneToOne(() => AccountEntity)
  @JoinColumn({
    name: 'account_id'
  })
  account?: AccountEntity
}
