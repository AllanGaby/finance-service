import { CreateOrUpdateManagerAccessProfilesUseCase, AccessProfileModel, mockAccessProfileModel } from '@/domain/authentication'

export class CreateOrUpdateManagerAccessProfilesUseCaseSpy implements CreateOrUpdateManagerAccessProfilesUseCase {
  managerAccessProfiles: AccessProfileModel[] = [
    mockAccessProfileModel(),
    mockAccessProfileModel(),
    mockAccessProfileModel()
  ]

  async createOrUpdateAccessProfiles (): Promise<AccessProfileModel[]> {
    return this.managerAccessProfiles
  }
}
