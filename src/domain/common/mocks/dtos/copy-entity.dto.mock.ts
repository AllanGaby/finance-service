import { CopyEntityDTO } from '@/domain/common'
import { datatype } from 'faker'

export const mockCopyEntityDTO = (): CopyEntityDTO => ({
  id: datatype.uuid()
})
