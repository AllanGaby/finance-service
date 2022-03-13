import { EntityModel } from '@/domain/common'

export type VersionedEntityModel = EntityModel & {
  version: number
  deleted_at?: Date
}
