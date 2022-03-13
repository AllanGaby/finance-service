import { EntityModel } from '@/domain/common'
import { RepositoryOptionsModel } from '@/protocols/repositories'

export interface GetEntityByIdRepository<EntityType extends EntityModel> {
  getById: (entityId: string, options?: RepositoryOptionsModel) => Promise<EntityType>
}
