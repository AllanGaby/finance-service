import {
  CreateOrUpdateManagerAccessProfilesSeedsProps,
  makeCreateOrUpdateManagerAccessProfilesSeeds
} from '@/main/factories/authentication/seeds'

export type AuthenticationModuleSeedProps =
CreateOrUpdateManagerAccessProfilesSeedsProps

export const AuthenticationModuleSeed = async (props: AuthenticationModuleSeedProps): Promise<void> => {
  await makeCreateOrUpdateManagerAccessProfilesSeeds(props)
}
