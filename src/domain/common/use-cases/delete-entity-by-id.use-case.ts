import { EntityModel } from '@/domain/common'

export interface DeleteEntityByIdUseCase<EntityType extends EntityModel> {
  deleteById: (entityId: string) => Promise<EntityType | undefined>
}
