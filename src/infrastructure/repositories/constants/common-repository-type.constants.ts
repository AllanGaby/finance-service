import {
  CountEntitiesRepository,
  CreateEntityInBulkRepository,
  CreateEntityRepository,
  DeleteEntitiesByListIdRepository,
  DeleteEntityByIdRepository,
  GetEntityByIdRepository,
  ListEntitiesRepository,
  SoftDeleteEntitiesByListIdRepository,
  SoftDeleteEntityByIdRepository,
  UpdateEntityRepository
} from '@/protocols/repositories'
import { EntityModel } from '@/domain/common'

export type CommonRepositoryType<EntityType extends EntityModel> =
| CountEntitiesRepository<EntityType>
| CreateEntityInBulkRepository<EntityType>
| CreateEntityRepository<EntityType>
| DeleteEntitiesByListIdRepository<EntityType>
| DeleteEntityByIdRepository<EntityType>
| GetEntityByIdRepository<EntityType>
| ListEntitiesRepository<EntityType>
| SoftDeleteEntitiesByListIdRepository<EntityType>
| SoftDeleteEntityByIdRepository<EntityType>
| UpdateEntityRepository<EntityType>
