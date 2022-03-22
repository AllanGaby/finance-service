import { CommonRouteHelperDTO } from '@/main/factories/common/helpers'

export type InvalidTypeValidationRouteHelperDTO = CommonRouteHelperDTO & {
  invalidValue: any
  type: string
}
