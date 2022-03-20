import { CommonRouteHelperDTO } from '@/main/factories/common/helpers'

export type PasswordConfirmationValidationRouteHelperDTO = CommonRouteHelperDTO & {
  sameTo: string
}
