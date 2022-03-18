import { AccessProfileModel } from '@/domain/authentication'
import {
  CreateOrUpdateManagerAccessProfilesUseCaseProps,
  makeCreateOrUpdateManagerAccessProfilesUseCase
} from '@/main/factories/authentication/use-cases'

export type CreateOrUpdateManagerAccessProfilesSeedsProps =
CreateOrUpdateManagerAccessProfilesUseCaseProps

export const makeCreateOrUpdateManagerAccessProfilesSeeds = async (props: CreateOrUpdateManagerAccessProfilesSeedsProps): Promise<AccessProfileModel[]> => {
  const createOrUpdateManagerAccessProfilesUseCase = makeCreateOrUpdateManagerAccessProfilesUseCase(props)
  return createOrUpdateManagerAccessProfilesUseCase.createOrUpdateAccessProfiles()
}
