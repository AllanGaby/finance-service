import { CopyEntityDTO, EntityModel } from '@/domain/common'

export interface CopyEntityUseCase<EntityType extends EntityModel, DTOType = CopyEntityDTO> {
  copy: (params: DTOType) => Promise<EntityType | undefined>
}
