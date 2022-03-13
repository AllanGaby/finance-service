import { GetCustomFilterUseCase, GetCustomFilterDTO, CustomFilterModel, mockCustomFilterModel } from '@/domain/common'

export class GetCustomFilterUseCaseSpy implements GetCustomFilterUseCase {
  params: GetCustomFilterDTO
  filters: CustomFilterModel[] = [
    mockCustomFilterModel(),
    mockCustomFilterModel(),
    mockCustomFilterModel()
  ]

  async getFilter (params: GetCustomFilterDTO): Promise<CustomFilterModel[]> {
    this.params = params
    return this.filters
  }
}
