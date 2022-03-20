import { DecryptRequestMiddleware } from '@/presentation/authentication'
import { RSAFactory, RSAConfig } from '@/infrastructure/rsa'

export type DecryptRequestMiddlewareProps =
  RSAConfig

export const makeDecryptRequestMiddleware = (props: DecryptRequestMiddlewareProps, fieldName: string = 'token'): DecryptRequestMiddleware =>
  new DecryptRequestMiddleware(
    RSAFactory.getRSAAdapter(props),
    fieldName
  )
