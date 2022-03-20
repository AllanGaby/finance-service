import { CommonRouteHelperDTO } from '@/main/factories/common/helpers'

export type SmallerValidationRouteHelperDTO = CommonRouteHelperDTO & {
  minLength: number
}
