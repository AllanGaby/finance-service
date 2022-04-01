import 'module-alias/register'
import { RequestRecoverPasswordModel } from '@/domain/authentication'
import { DefaultEntity } from '@/infrastructure/repositories'
import { AccountEntity } from '@/infrastructure/authentication'
import { Entity, Column, OneToOne, JoinColumn, DeleteDateColumn } from 'typeorm'

@Entity('request_recover_passwords')
export class RequestRecoverPasswordEntity extends DefaultEntity implements RequestRecoverPasswordModel {
  @Column()
  authentication_secret: string

  @Column()
  validation_code: string

  @Column()
  account_id: string

  @OneToOne(() => AccountEntity)
  @JoinColumn({
    name: 'account_id'
  })
  account?: AccountEntity

  @DeleteDateColumn()
  deleted_at?: Date
}
