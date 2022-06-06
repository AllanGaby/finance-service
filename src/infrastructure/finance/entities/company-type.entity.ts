import 'module-alias/register'
import { CompanyTypeModel } from '@/domain/finance'
import { DefaultEntity } from '@/infrastructure/repositories'
import { CompanyEntity } from '@/infrastructure/finance'
import { Entity, Column, OneToMany } from 'typeorm'

@Entity('company_types')
export class CompanyTypeEntity extends DefaultEntity implements CompanyTypeModel {
  @Column()
  name: string

  @OneToMany(() => CompanyEntity, company => company.company_type)
  companies?: CompanyEntity[]
}
