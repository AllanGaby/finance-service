import { GetCustomFilterDTO, CustomFilterConditional, mockCustomFilterConditional, CustomFilterOperator, mockCustomFilterOperator } from '@/domain/common'
import { database, datatype } from 'faker'

export const mockGetCustomFilterDTO = (filterLength: number = datatype.number({ min: 1, max: 10 })): GetCustomFilterDTO => {
  const f: string[] = []
  const v: string[] = []
  const o: CustomFilterOperator[] = []
  const c: CustomFilterConditional[] = []

  for (let index = 1; index <= filterLength; index++) {
    f.push(database.column())
    v.push(datatype.uuid())
    o.push(mockCustomFilterOperator())
    c.push(mockCustomFilterConditional())
  }
  return {
    f,
    v,
    o,
    c
  }
}
