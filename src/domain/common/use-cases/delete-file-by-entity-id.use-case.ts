import { EntityModel } from '@/domain/common'

export interface DeleteFileByEntityIdUseCase<EntityType extends EntityModel> {
  deleteById: (entityId: string) => Promise<EntityType | undefined>
}
