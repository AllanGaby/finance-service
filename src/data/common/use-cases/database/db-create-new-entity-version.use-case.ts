import { CreateNewEntityVersionUseCase, CustomFilterConditional, CustomFilterOperator, UpdateEntityDTO, VersionedEntityModel } from '@/domain/common'
import {
  CreateEntityRepository,
  GetOneEntityRepository,
  SoftDeleteEntityRepository
} from '@/protocols/repositories'
import { EntityIsNotFoundError } from '@/data/common/errors'

export class DbCreateNewEntityVersionUseCase<EntityType extends VersionedEntityModel, UpdateEntityDTOType = UpdateEntityDTO<EntityType>>
implements CreateNewEntityVersionUseCase<EntityType, UpdateEntityDTOType> {
  constructor (
    private readonly getEntityOneRepository: GetOneEntityRepository<EntityType>,
    private readonly entityName: string,
    private readonly softDeleteEntityRepository: SoftDeleteEntityRepository<EntityType>,
    private readonly createNewEntityEntityRepository: CreateEntityRepository<EntityType>
  ) {}

  async createVersion (entityId: string, params: UpdateEntityDTOType): Promise<EntityType> {
    const entityById = await this.getEntityOneRepository.getOne([{
      field: 'id',
      conditional: CustomFilterConditional.equal,
      operator: CustomFilterOperator.and,
      value: entityId
    }, {
      field: 'deleted_at',
      conditional: CustomFilterConditional.isEmpty,
      operator: CustomFilterOperator.and,
      value: undefined
    }], {
      useJoin: false
    })
    if (!entityById) {
      throw new EntityIsNotFoundError(this.entityName)
    }
    const filter = {
      id: entityById.id,
      version: entityById.version
    } as unknown as Partial<EntityType>
    await this.softDeleteEntityRepository.softDelete(filter)
    const { id: lastVersionId, ...oldEntityParams } = entityById
    return this.createNewEntityEntityRepository.create({
      ...oldEntityParams,
      ...params,
      deleted_at: null,
      version: entityById.version + 1,
      id: lastVersionId
    })
  }
}
