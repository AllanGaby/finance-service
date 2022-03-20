import { CommonRouteHelperDTO } from '@/main/factories/common/helpers'

export type BiggerValidationRouteHelperDTO = CommonRouteHelperDTO & {
  maxLength: number
}
