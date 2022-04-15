import { MapperCustomFiltersMiddleware } from '@/presentation/common'
import { MapperCustomFilterUseCaseProps, makeMapperCustomFilterUseCase } from '@/main/factories/common/use-cases'

export type MapperCustomFiltersMiddlewareProps =
MapperCustomFilterUseCaseProps

export const makeMapperCustomFiltersMiddleware = (props: MapperCustomFiltersMiddlewareProps): MapperCustomFiltersMiddleware =>
  new MapperCustomFiltersMiddleware(
    makeMapperCustomFilterUseCase(props)
  )
