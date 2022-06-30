import 'module-alias/register'
import { TransactionTagModel } from '@/domain/finance'
import { AccountEntity } from '@/infrastructure/authentication'
import { DefaultEntity } from '@/infrastructure/repositories'
import { FinanceTransactionEntity } from '@/infrastructure/finance'
import { Entity, Column, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm'

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

  @ManyToMany(() => FinanceTransactionEntity)
  @JoinTable({
    name: 'finance_transaction_tags',
    inverseJoinColumn: {
      name: 'transaction_tag_id',
      referencedColumnName: 'id'
    },
    joinColumn: {
      name: 'finance_transaction_id',
      referencedColumnName: 'id'
    }
  })
  finance_transactions?: FinanceTransactionEntity[]
}
