import { SetSettingsHeaderMiddleware } from '@/presentation/common'
import { GetCurrentSettingsUseCaseProps, makeGetCurrentSettingsUseCase } from '@/main/factories/common/use-cases'

export type SetSettingsHeaderMiddlewareProps = GetCurrentSettingsUseCaseProps

export const makeSetSettingsHeaderMiddleware = (props: SetSettingsHeaderMiddlewareProps): SetSettingsHeaderMiddleware =>
  new SetSettingsHeaderMiddleware(
    makeGetCurrentSettingsUseCase(props)
  )
