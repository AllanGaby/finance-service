import 'module-alias/register'
import { CompanyTypeModel } from '@/domain/finance'
import { DefaultEntity } from '@/infrastructure/repositories'
import { CompanyTypeEntity } from '@/infrastructure/finance'
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm'

@Entity('companies')
export class CompanyEntity extends DefaultEntity implements CompanyTypeModel {
  @Column()
  name: string

  @Column()
  company_type_id: string

  @OneToOne(() => CompanyTypeEntity)
  @JoinColumn({
    name: 'account_id'
  })
  company_type?: CompanyTypeEntity
}
