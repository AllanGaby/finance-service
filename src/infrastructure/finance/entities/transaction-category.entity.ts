import 'module-alias/register'
import { TransactionCategoryModel } from '@/domain/finance'
import { AccountEntity } from '@/infrastructure/authentication'
import { DefaultEntity } from '@/infrastructure/repositories'
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm'

@Entity('transaction_categories')
export class TransactionCategoryEntity extends DefaultEntity implements TransactionCategoryModel {
  @Column()
  account_id: string

  @Column()
  name: string

  @Column()
  credit: boolean

  @Column()
  debit: boolean

  @OneToOne(() => AccountEntity)
  @JoinColumn({
    name: 'account_id'
  })
  account?: AccountEntity
}
