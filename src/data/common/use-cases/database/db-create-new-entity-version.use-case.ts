import { CreateNewEntityVersionUseCase, UpdateEntityDTO, VersionedEntityModel } from '@/domain/common'
import {
  CreateEntityRepository,
  GetEntityByIdRepository,
  SoftDeleteEntityByIdRepository
} from '@/protocols/repositories'
import { EntityIsNotFoundError } from '@/data/common/errors'

export class DbCreateNewEntityVersionUseCase<EntityType extends VersionedEntityModel, UpdateEntityDTOType = UpdateEntityDTO<EntityType>>
implements CreateNewEntityVersionUseCase<EntityType, UpdateEntityDTOType> {
  constructor (
    private readonly getEntityByIdRepository: GetEntityByIdRepository<EntityType>,
    private readonly entityName: string,
    private readonly softDeleteEntityRepository: SoftDeleteEntityByIdRepository<EntityType>,
    private readonly createNewEntityEntityRepository: CreateEntityRepository<EntityType>
  ) {}

  async createVersion (entityId: string, params: UpdateEntityDTOType): Promise<EntityType> {
    const entityById = await this.getEntityByIdRepository.getById(entityId, {
      useJoin: false
    })
    if (!entityById) {
      throw new EntityIsNotFoundError(this.entityName)
    }
    await this.softDeleteEntityRepository.softDeleteById(entityById.id)
    const { id: lastVersionId, ...oldEntityParams } = entityById
    return this.createNewEntityEntityRepository.create({
      ...oldEntityParams,
      ...params,
      deleted_at: null,
      current_version_id: null,
      version: entityById.version + 1,
      last_version_id: lastVersionId
    })
  }
}
