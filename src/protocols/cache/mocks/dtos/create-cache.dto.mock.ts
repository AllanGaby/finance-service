import { CreateCacheDTO } from '@/protocols/cache'
import { datatype, random } from 'faker'

export const mockCreateCacheDTO = <RecordType = object>(): CreateCacheDTO<RecordType> => ({
  key: datatype.uuid(),
  record: random.objectElement<RecordType>()
})
