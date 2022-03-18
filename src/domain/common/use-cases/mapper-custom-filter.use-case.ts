import { CustomFilterModel, MapperCustomFilterDTO } from '@/domain/common'

export interface MapperCustomFilterUseCase {
  mapperFilters: (params: MapperCustomFilterDTO) => Promise<CustomFilterModel[]>
}
