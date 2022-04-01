import {
  CountEntitiesRepository,
  CreateEntityInBulkRepository,
  CreateEntityRepository,
  DeleteEntitiesByListIdRepository,
  DeleteEntityByIdRepository,
  DeleteEntityRepository,
  GetEntityByIdRepository,
  GetOneEntityRepository,
  ListEntitiesRepository,
  SoftDeleteEntitiesByListIdRepository,
  SoftDeleteEntityByIdRepository,
  SoftDeleteEntityRepository,
  UpdateEntityRepository
} from '@/protocols/repositories'
import { EntityModel } from '@/domain/common'

export type CommonRepositoryType<EntityType extends EntityModel> =
| CountEntitiesRepository<EntityType>
| CreateEntityInBulkRepository<EntityType>
| CreateEntityRepository<EntityType>
| DeleteEntitiesByListIdRepository<EntityType>
| DeleteEntityByIdRepository<EntityType>
| DeleteEntityRepository<EntityType>
| GetEntityByIdRepository<EntityType>
| GetOneEntityRepository<EntityType>
| ListEntitiesRepository<EntityType>
| SoftDeleteEntitiesByListIdRepository<EntityType>
| SoftDeleteEntityByIdRepository<EntityType>
| SoftDeleteEntityRepository<EntityType>
| UpdateEntityRepository<EntityType>
