import { EntityModel } from '@/domain/common'

export interface SoftDeleteEntityRepository<EntityType extends EntityModel> {
  softDelete: (filter: Partial<EntityType>) => Promise<EntityType | undefined>
}
