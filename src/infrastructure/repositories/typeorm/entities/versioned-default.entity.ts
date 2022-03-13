
import 'module-alias/register'
import { Column, DeleteDateColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { VersionedEntityModel } from '@/domain/common'

export abstract class VersionedDefaultEntity implements VersionedEntityModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('uuid')
  last_version_id?: string

  @Column()
  version: number

  @DeleteDateColumn()
  deleted_at?: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
