import { DeleteFileByEntityIdUseCase, EntityModel } from '@/domain/common'

export class DeleteFileByEntityIdUseCaseSpy<EntityType extends EntityModel> implements DeleteFileByEntityIdUseCase<EntityType> {
  entityId: string

  async deleteById (entityId: string): Promise<EntityType | undefined> {
    this.entityId = entityId
    return undefined
  }
}
