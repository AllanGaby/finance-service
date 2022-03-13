import { ListEntityModel, ListEntitiesDTO } from '@/domain/common'

export interface ListEntitiesUseCase<RecortType> {
  list: (filter: ListEntitiesDTO) => Promise<ListEntityModel<RecortType>>
}
