import { EntityModel } from '@/domain/common'

export interface DeleteEntityRepository<EntityType extends EntityModel> {
  delete: (filter: Partial<EntityType>) => Promise<EntityType | undefined>
}
