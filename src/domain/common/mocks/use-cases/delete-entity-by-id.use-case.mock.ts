import { DeleteEntityByIdUseCase, EntityModel } from '@/domain/common'

export class DeleteEntityByIdUseCaseSpy<EntityType extends EntityModel>
implements DeleteEntityByIdUseCase<EntityType> {
  entityId: string

  async deleteById (entityId: string): Promise<EntityType | undefined> {
    this.entityId = entityId
    return undefined
  }
}
