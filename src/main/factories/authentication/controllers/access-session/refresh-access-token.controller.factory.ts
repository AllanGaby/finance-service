import { RefreshAccessTokenController } from '@/presentation/authentication'
import { RefreshAccessTokenUseCaseProps, makeRefreshAccessTokenUseCase } from '@/main/factories/authentication/use-cases'

export type RefreshAccessTokenControllerProps =
RefreshAccessTokenUseCaseProps

export const makeRefreshAccessTokenController = (props: RefreshAccessTokenControllerProps): RefreshAccessTokenController =>
  new RefreshAccessTokenController(
    makeRefreshAccessTokenUseCase(props)
  )
