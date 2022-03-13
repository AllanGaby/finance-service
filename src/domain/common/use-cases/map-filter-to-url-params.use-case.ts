import { ListEntitiesDTO } from '@/domain/common'

export interface MapFilterToURLParamsUseCase {
  map: (filter: ListEntitiesDTO) => string
}
