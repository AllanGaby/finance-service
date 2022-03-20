import { RepositoryOptionsModel } from '@/protocols/repositories'
import { datatype } from 'faker'

export const mockRepositoryOptionsModel = (): RepositoryOptionsModel => ({
  returnDeletedEntities: datatype.boolean(),
  returnCompleteData: datatype.boolean(),
  useJoin: datatype.boolean()
})
