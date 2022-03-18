import { ConfigSetup, EnvironmentType } from '@/main/application/config'
import { AuthenticationModuleSeed } from '@/main/factories/authentication/setup'

export const SeedsSetup = async (): Promise<void> => {
  const config = ConfigSetup()
  if (config.environment !== EnvironmentType.test) {
    await AuthenticationModuleSeed({
      repositoryType: config.repositoryType
    })
  }
}
