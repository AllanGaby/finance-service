import { UpdateEntityDTO, EntityModel } from '@/domain/common'

export interface UpdateEntityByIdUseCase<EntityType extends EntityModel, UpdateEntityDTOType = UpdateEntityDTO<EntityType>> {
  updateById: (entityId: string, params: UpdateEntityDTOType) => Promise<EntityType>
}
