import { CustomFilterModel, CustomFilterMapperDTO } from '@/domain/common'

export interface CustomFilterMapperUseCase {
  getFilters: (params: CustomFilterMapperDTO) => Promise<CustomFilterModel[]>
}
