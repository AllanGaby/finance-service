import { EntityModel } from '@/domain/common'

export type UpdateEntityDTO<EntityType extends EntityModel> = Partial<EntityType>
