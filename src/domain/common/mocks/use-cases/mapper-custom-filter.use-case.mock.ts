import { MapperCustomFilterUseCase, MapperCustomFilterDTO, CustomFilterModel, mockCustomFilterModel } from '@/domain/common'

export class MapperCustomFilterUseCaseSpy implements MapperCustomFilterUseCase {
  params: MapperCustomFilterDTO
  filters: CustomFilterModel[] = [
    mockCustomFilterModel(),
    mockCustomFilterModel(),
    mockCustomFilterModel()
  ]

  async mapperFilters (params: MapperCustomFilterDTO): Promise<CustomFilterModel[]> {
    this.params = params
    return this.filters
  }
}
