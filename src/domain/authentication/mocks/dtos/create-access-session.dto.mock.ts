import { CreateAccessSessionDTO, mockAccountModel } from '@/domain/authentication'
import { internet } from 'faker'

export const mockCreateAccessSessionDTO = (): CreateAccessSessionDTO => ({
  ...mockAccountModel(),
  ip: internet.ip()
})
