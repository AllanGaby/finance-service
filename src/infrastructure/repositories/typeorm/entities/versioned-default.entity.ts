import 'module-alias/register'
import { DeleteDateColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { VersionedEntityModel } from '@/domain/common'

export abstract class VersionedDefaultEntity implements VersionedEntityModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @PrimaryColumn()
  version: number

  @DeleteDateColumn()
  deleted_at?: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
