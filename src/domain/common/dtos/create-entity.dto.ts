import { EntityModel } from '@/domain/common'

export type CreateEntityDTO<EntityType extends EntityModel> = Omit<Omit<Omit<EntityType, 'id'>, 'created_at'>, 'updated_at'>
