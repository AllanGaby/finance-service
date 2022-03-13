import { DeleteEntityByIdUseCase, EntityModel } from '@/domain/common'
import { SoftDeleteEntityByIdRepository } from '@/protocols/repositories'

export class DbSoftDeleteEntityByIdUseCase<EntityType extends EntityModel> implements DeleteEntityByIdUseCase<EntityType> {
  constructor (
    private readonly softDeleteEntityByIdRepository: SoftDeleteEntityByIdRepository<EntityType>
  ) {}

  async deleteById (entityId: string): Promise<EntityType | undefined> {
    await this.softDeleteEntityByIdRepository.softDeleteById(entityId)
    return undefined
  }
}
