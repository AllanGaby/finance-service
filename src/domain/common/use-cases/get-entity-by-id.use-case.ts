import { EntityModel } from '@/domain/common'

export interface GetEntityByIdUseCase<EntityType extends EntityModel> {
  getById: (entityId: string) => Promise<EntityType>
}
