import { AccessProfileModel } from '@/domain/authentication'

export interface CreateOrUpdateManagerAccessProfilesUseCase {
  createOrUpdateAccessProfiles: () => Promise<AccessProfileModel[]>
}
