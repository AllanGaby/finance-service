import { CommonRepositorySettingsModel, RepositoryType } from '@/infrastructure/repositories'

export type CommonUseCaseProps = {
  repositoryType: RepositoryType
  repositorySettings?: CommonRepositorySettingsModel
}
