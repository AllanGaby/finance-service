import { CreateEntityDTO, SettingsModel } from '@/domain/common'

export interface CreateEntityUseCase<EntityType, CreateEntityDTOType = CreateEntityDTO<EntityType>> {
  create: (params: CreateEntityDTOType, settings?: SettingsModel) => Promise<EntityType | EntityType[] | undefined>
}
