import { LoginController } from '@/presentation/authentication'
import { LoginUseCaseProps, makeLoginUseCase } from '@/main/factories/authentication/use-cases'

export type LoginControllerProps =
LoginUseCaseProps

export const makeLoginController = (props: LoginControllerProps): LoginController =>
  new LoginController(
    makeLoginUseCase(props)
  )
