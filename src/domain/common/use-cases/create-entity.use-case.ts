import { CreateEntityDTO } from '@/domain/common'

export interface CreateEntityUseCase<EntityType, CreateEntityDTOType = CreateEntityDTO<EntityType>> {
  create: (params: CreateEntityDTOType) => Promise<EntityType | EntityType[]>
}
