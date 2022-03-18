import {
  CreateOrUpdateManagerAccessProfilesSeedsProps,
  makeCreateOrUpdateManagerAccessProfilesSeeds
} from '@/main/factories/authentication/seeds'

export type AuthenticationModuleSeedProps =
CreateOrUpdateManagerAccessProfilesSeedsProps

export const AuthenticationModuleSeed = async (props: AuthenticationModuleSeedProps): Promise<void> => {
  const accessProfiles = await makeCreateOrUpdateManagerAccessProfilesSeeds(props)
  console.log(accessProfiles)
}
