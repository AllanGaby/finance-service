import { EntityModel } from '@/domain/common'
import { RepositoryType, CommonRepositoryType } from '@/infrastructure/repositories'
import { CommonTypeORMRepository } from './typeorm'
import { CommonMemoryRepository } from './memory'
import { EntityTarget } from 'typeorm'

export class CommonRepositoryFactory {
  static getRepository<EntityType extends EntityModel>(repositoryType: RepositoryType, entityClass: EntityTarget<EntityType>): CommonRepositoryType<EntityType> {
    switch (repositoryType) {
      case RepositoryType.Memory:
        return CommonMemoryRepository.getRepository<EntityType>() as CommonRepositoryType<EntityType>
      case RepositoryType.TypeOrm:
        return new CommonTypeORMRepository<EntityType>(entityClass) as CommonRepositoryType<EntityType>
    }
  }
}
