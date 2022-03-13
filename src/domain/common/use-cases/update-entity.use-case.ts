import { UpdateEntityDTO, EntityModel } from '@/domain/common'

export interface UpdateEntityUseCase<EntityType extends EntityModel, UpdateEntityDTOType = UpdateEntityDTO<EntityType>> {
  update: (params: UpdateEntityDTOType) => Promise<EntityType | EntityType[]>
}
