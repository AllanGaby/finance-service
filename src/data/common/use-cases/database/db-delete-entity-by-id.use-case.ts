import { DeleteEntityByIdUseCase, EntityModel } from '@/domain/common'
import { DeleteEntityByIdRepository } from '@/protocols/repositories'

export class DbDeleteEntityByIdUseCase<EntityType extends EntityModel> implements DeleteEntityByIdUseCase<EntityType> {
  constructor (
    private readonly deleteEntityByIdRepository: DeleteEntityByIdRepository<EntityType>
  ) {}

  async deleteById (entityId: string): Promise<EntityType | undefined> {
    await this.deleteEntityByIdRepository.deleteById(entityId)
    return undefined
  }
}
