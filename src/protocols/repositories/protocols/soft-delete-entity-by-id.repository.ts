import { EntityModel } from '@/domain/common'

export interface SoftDeleteEntityByIdRepository<EntityType extends EntityModel> {
  softDeleteById: (entityId: string) => Promise<EntityType | undefined>
}
