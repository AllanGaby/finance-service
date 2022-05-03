import { CustomFilterMapperUseCase, CustomFilterMapperDTO, CustomFilterModel, mockCustomFilterModel } from '@/domain/common'

export class CustomFilterMapperUseCaseSpy implements CustomFilterMapperUseCase {
  params: CustomFilterMapperDTO
  filters: CustomFilterModel[] = [
    mockCustomFilterModel(),
    mockCustomFilterModel(),
    mockCustomFilterModel()
  ]

  async getFilters (params: CustomFilterMapperDTO): Promise<CustomFilterModel[]> {
    this.params = params
    return this.filters
  }
}
