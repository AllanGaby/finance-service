import { EntityModel } from '@/domain/common'
import { RepositoryType, TypeOrmRepositorySettingsModel } from '@/infrastructure/repositories'
import { CommonRepositoryType } from '@/protocols/repositories'
import { CommonTypeORMRepository } from './typeorm'
import { CommonMemoryRepository } from './memory'
import { EntityTarget } from 'typeorm'

export type CommonRepositorySettingsModel = TypeOrmRepositorySettingsModel

export class CommonRepositoryFactory {
  static getRepository<
    EntityType extends EntityModel,
    EntityRepositoryType extends CommonRepositoryType<EntityType>>(
    repositoryType: RepositoryType,
    entityClass: EntityTarget<EntityType>,
    settings?: CommonRepositorySettingsModel
  ): EntityRepositoryType {
    switch (repositoryType) {
      case RepositoryType.Memory:
        return CommonMemoryRepository.getRepository<EntityType>() as unknown as EntityRepositoryType
      case RepositoryType.TypeOrm:
        return new CommonTypeORMRepository<EntityType>(entityClass, settings) as unknown as EntityRepositoryType
    }
  }
}
