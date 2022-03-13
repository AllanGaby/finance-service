import { EntityModel } from '@/domain/common'

export interface GetFileByEntityIdUseCase<EntityType extends EntityModel> {
  getById: (entityId: string) => Promise<EntityType | Buffer>
}
