import { EntityModel } from '@/domain/common'

export interface DeleteEntityByIdRepository<EntityType extends EntityModel> {
  deleteById: (entityId: string) => Promise<EntityType | undefined>
}
