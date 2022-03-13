import { ListEntityModel, EntityModel } from '@/domain/common'
import { datatype } from 'faker'

export const mockListEntityModel = <EntityType extends EntityModel>(data: EntityType[] = []): ListEntityModel<EntityType> => ({
  data,
  page: datatype.number(),
  last_page: datatype.number(),
  record_count: datatype.number()
})
