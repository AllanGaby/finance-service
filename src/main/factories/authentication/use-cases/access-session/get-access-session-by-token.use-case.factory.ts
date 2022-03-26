import { GetAccessSessionByTokenUseCase } from '@/domain/authentication'
import { DbGetAccessSessionbyTokenUseCase } from '@/data/authentication/use-cases'
import { CommonUseCaseProps } from '@/infrastructure/common'
import { JWTFactory } from '@/infrastructure/jwt'
import { RSAConfig, RSAFactory } from '@/infrastructure/rsa'
import { CacheConfigurationModel, CacheFactory } from '@/infrastructure/cache'

export type GetAccessSessionByTokenUseCaseProps =
CommonUseCaseProps &
RSAConfig &
CacheConfigurationModel &
{
  secret: string
}

export const makeGetAccessSessionByTokenUseCase = (props: GetAccessSessionByTokenUseCaseProps): GetAccessSessionByTokenUseCase =>
  new DbGetAccessSessionbyTokenUseCase(
    JWTFactory.GetJWTAdapter(props.secret),
    RSAFactory.getRSAAdapter(props),
    CacheFactory.getCacheAdapter(props)
  )
