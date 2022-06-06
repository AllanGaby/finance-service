import 'module-alias/register'
import { FinanceTransactionTagModel } from '@/domain/finance'
import { DefaultEntity } from '@/infrastructure/repositories'
import { TransactionTagEntity, FinanceTransactionEntity } from '@/infrastructure/finance'
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm'

@Entity('finance_transaction_tags')
export class FinanceTransactionTagEntity extends DefaultEntity implements FinanceTransactionTagModel {
  @Column()
  finance_transaction_id: string

  @OneToOne(() => FinanceTransactionEntity)
  @JoinColumn({
    name: 'finance_transaction_id'
  })
  finance_transaction?: FinanceTransactionEntity

  @Column()
  transaction_tag_id: string

  @OneToOne(() => TransactionTagEntity)
  @JoinColumn({
    name: 'transaction_tag_id'
  })
  transaction_tag?: TransactionTagEntity
}
