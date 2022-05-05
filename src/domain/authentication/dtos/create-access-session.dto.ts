import { AccountModel } from '@/domain/authentication'

export type CreateAccessSessionDTO = AccountModel & {
  ip: string
}
