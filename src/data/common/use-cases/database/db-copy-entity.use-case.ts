import { CopyEntityUseCase, EntityModel, CopyEntityDTO } from '@/domain/common'
import { GetEntityByIdRepository, RepositoryOptionsModel, CreateEntityRepository } from '@/protocols/repositories'
import { EntityIsNotFoundError } from '@/data/common/errors'

export class DbCopyEntityUseCase<EntityType extends EntityModel> implements CopyEntityUseCase<EntityType, CopyEntityDTO> {
  constructor (
    private readonly getEntityByIdRepository: GetEntityByIdRepository<EntityType>,
    private readonly createEntityRepository: CreateEntityRepository<EntityType>,
    private readonly entityName: string,
    private readonly options: RepositoryOptionsModel = {
      returnDeletedEntities: true
    }
  ) {}

  async copy ({ id: entityId }: CopyEntityDTO): Promise<EntityType> {
    const entity = await this.getEntityByIdRepository.getById(entityId, this.options)
    if (!entity) {
      throw new EntityIsNotFoundError(this.entityName)
    }
    delete entity.id
    delete entity.created_at
    delete entity.updated_at
    return this.createEntityRepository.create(entity)
  }
}
