import 'module-alias/register'
import { AccountModel } from '@/domain/authentication'
import { DefaultEntity } from '@/infrastructure/repositories'
import { Entity, Column } from 'typeorm'

@Entity('accounts')
export class AccountEntity extends DefaultEntity implements AccountModel {
  @Column()
  name: string

  @Column()
  email: string

  @Column()
  identification?: string

  @Column()
  password: string

  @Column()
  account_hash: string
}
