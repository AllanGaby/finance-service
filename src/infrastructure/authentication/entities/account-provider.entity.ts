import 'module-alias/register'
import { AccountProviderModel, AuthenticationProvider } from '@/domain/authentication'
import { DefaultEntity } from '@/infrastructure/repositories'
import { AccountEntity } from '@/infrastructure/authentication'
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm'

@Entity('account_providers')
export class AccountProviderEntity extends DefaultEntity implements AccountProviderModel {
  @Column()
  account_id: string

  @Column()
  account_provider_id: string

  @Column()
  provider: AuthenticationProvider

  @OneToOne(() => AccountEntity)
  @JoinColumn({
    name: 'account_id'
  })
  account?: AccountEntity
}
