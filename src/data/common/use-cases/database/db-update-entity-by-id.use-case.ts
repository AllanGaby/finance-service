import { UpdateEntityByIdUseCase, UpdateEntityDTO, EntityModel } from '@/domain/common'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/protocols/repositories'
import { EntityIsNotFoundError } from '@/data/common/errors'

export class DbUpdateEntityByIdUseCase<EntityType extends EntityModel, UpdateEntityDTOType = UpdateEntityDTO<EntityType>>
implements UpdateEntityByIdUseCase<EntityType, UpdateEntityDTOType> {
  constructor (
    private readonly getEntityByIdRepository: GetEntityByIdRepository<EntityType>,
    private readonly updateEntityRepository: UpdateEntityRepository<EntityType>,
    private readonly entityName: string
  ) {}

  async updateById (entityId: string, params: UpdateEntityDTOType): Promise<EntityType> {
    const entity = await this.getEntityByIdRepository.getById(entityId, {
      returnDeletedEntities: true
    })
    if (!entity) {
      throw new EntityIsNotFoundError(this.entityName)
    }
    return this.updateEntityRepository.update({
      ...params,
      id: entity.id
    })
  }
}
