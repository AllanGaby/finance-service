import { ListOrdersMapperMiddleware } from '@/presentation/common'
import { ListOrderMapperUseCaseProps, makeListOrderMapperUseCase } from '@/main/factories/common/use-cases'

export type ListOrdersMapperMiddlewareProps =
ListOrderMapperUseCaseProps

export const makeListOrdersMapperMiddleware = (props: ListOrdersMapperMiddlewareProps): ListOrdersMapperMiddleware =>
  new ListOrdersMapperMiddleware(
    makeListOrderMapperUseCase(props)
  )
