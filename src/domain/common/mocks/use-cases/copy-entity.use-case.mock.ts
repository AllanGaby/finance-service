import { CopyEntityUseCase, EntityModel, CopyEntityDTO } from '@/domain/common'

export class CopyEntityUseCaseSpy<EntityType extends EntityModel, DTOType = CopyEntityDTO>
implements CopyEntityUseCase<EntityType, DTOType> {
  dto: DTOType
  entity: EntityType

  async copy (dto: DTOType): Promise<EntityType> {
    this.dto = dto
    return this.entity
  }
}
