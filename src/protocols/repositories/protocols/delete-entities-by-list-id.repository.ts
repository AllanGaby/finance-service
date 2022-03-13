import { EntityModel } from '@/domain/common'

export interface DeleteEntitiesByListIdRepository<EntityType extends EntityModel> {
  deleteByListId: (listEntityId: string[]) => Promise<EntityType | undefined>
}
