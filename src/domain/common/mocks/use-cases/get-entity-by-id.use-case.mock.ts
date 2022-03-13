import { GetEntityByIdUseCase, EntityModel } from '@/domain/common'

export class GetEntityByIdUseCaseSpy<EntityType extends EntityModel>
implements GetEntityByIdUseCase<EntityType> {
  entityId: string
  entity: EntityType

  async getById (entityId: string): Promise<EntityType> {
    this.entityId = entityId
    return this.entity
  }
}
