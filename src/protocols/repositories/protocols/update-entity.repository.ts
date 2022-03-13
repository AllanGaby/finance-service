import { EntityModel } from '@/domain/common'

export interface UpdateEntityRepository<EntityType extends EntityModel> {
  update: (params: Partial<EntityType>) => Promise<EntityType>
}
