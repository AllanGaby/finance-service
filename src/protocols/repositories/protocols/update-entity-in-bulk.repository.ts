import { EntityModel } from '@/domain/common'

export interface UpdateEntityInBulkRepository<EntityType extends EntityModel> {
  updateInBulk: (params: Array<Partial<EntityType>>) => Promise<EntityType[]>
}
