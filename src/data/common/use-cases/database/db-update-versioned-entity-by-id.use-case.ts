import {
  UpdateEntityByIdUseCase,
  UpdateEntityDTO,
  VersionedEntityModel,
  CreateNewEntityVersionUseCase
} from '@/domain/common'

export class DbUpdateVersionedEntityByIdUseCase<EntityType extends VersionedEntityModel, UpdateEntityDTOType = UpdateEntityDTO<EntityType>>
implements UpdateEntityByIdUseCase<EntityType, UpdateEntityDTOType> {
  constructor (
    private readonly createNewEntityVersionUseCase: CreateNewEntityVersionUseCase<EntityType>
  ) {}

  async updateById (entityId: string, params: UpdateEntityDTOType): Promise<EntityType> {
    return this.createNewEntityVersionUseCase.createVersion(entityId, params)
  }
}
