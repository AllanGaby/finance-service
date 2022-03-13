import { GetEntityByIdUseCase, EntityModel } from '@/domain/common'
import { GetEntityByIdRepository, RepositoryOptionsModel } from '@/protocols/repositories'
import { EntityIsNotFoundError } from '@/data/common/errors'

export class DbGetEntityByIdUseCase<EntityType extends EntityModel> implements GetEntityByIdUseCase<EntityType> {
  constructor (
    private readonly getEntityByIdRepository: GetEntityByIdRepository<EntityType>,
    private readonly entityName: string,
    private readonly options: RepositoryOptionsModel = {
      returnDeletedEntities: true
    }
  ) {}

  async getById (entityId: string): Promise<EntityType> {
    const entity = await this.getEntityByIdRepository.getById(entityId, this.options)
    if (!entity) {
      throw new EntityIsNotFoundError(this.entityName)
    }
    return entity
  }
}
