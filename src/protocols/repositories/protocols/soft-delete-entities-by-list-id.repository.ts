import { EntityModel } from '@/domain/common'

export interface SoftDeleteEntitiesByListIdRepository<EntityType extends EntityModel> {
  softDeleteByListId: (listEntityId: string[]) => Promise<EntityType | undefined>
}
