import { RecoverAccessSessionMiddleware } from '@/presentation/authentication'
import { GetAccessSessionByTokenUseCaseProps, makeGetAccessSessionByTokenUseCase } from '@/main/factories/authentication/use-cases'
import { makeAuthenticatedTokenHeaderRequestFieldsValidations } from '@/main/factories/authentication/fields-validations'
import { RequestValidatorFactory } from '@/infrastructure/request-validator'

export type RecoverAccessSessionMiddlewareProps =
GetAccessSessionByTokenUseCaseProps & {
  accessTokenName: string
}

export const makeRecoverAccessSessionMiddleware = (props: RecoverAccessSessionMiddlewareProps, ruleKeys: string[] = []): RecoverAccessSessionMiddleware =>
  new RecoverAccessSessionMiddleware(
    makeAuthenticatedTokenHeaderRequestFieldsValidations(props.accessTokenName),
    RequestValidatorFactory.getRequestValidator(),
    makeGetAccessSessionByTokenUseCase(props),
    props.accessTokenName,
    ruleKeys
  )
