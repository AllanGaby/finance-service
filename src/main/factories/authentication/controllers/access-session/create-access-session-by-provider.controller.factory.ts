import { CreateAccessSessionByProviderController } from '@/presentation/authentication'
import { CreateAccessSessionByProviderUseCaseProps, makeCreateAccessSessionByProviderUseCase } from '@/main/factories/authentication/use-cases'

export type CreateAccessSessionByProviderControllerProps = CreateAccessSessionByProviderUseCaseProps

export const makeCreateAccessSessionByProviderController = (
  props: CreateAccessSessionByProviderControllerProps
): CreateAccessSessionByProviderController =>
  new CreateAccessSessionByProviderController(
    makeCreateAccessSessionByProviderUseCase(props)
  )
