import { VersionedEntityModel, mockEntityModel } from '@/domain/common'
import { datatype, date } from 'faker'

export const mockVersionedEntityModel = (): VersionedEntityModel => ({
  ...mockEntityModel(),
  deleted_at: date.past(),
  version: datatype.number()
})
