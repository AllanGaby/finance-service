import { CustomFiltersMapperMiddleware } from '@/presentation/common'
import { CustomFilterMapperUseCaseProps, makeCustomFilterMapperUseCase } from '@/main/factories/common/use-cases'

export type CustomFiltersMapperMiddlewareProps =
CustomFilterMapperUseCaseProps

export const makeCustomFiltersMapperMiddleware = (props: CustomFiltersMapperMiddlewareProps): CustomFiltersMapperMiddleware =>
  new CustomFiltersMapperMiddleware(
    makeCustomFilterMapperUseCase(props)
  )
