import { EntityModel, GetFileByEntityIdUseCase } from '@/domain/common'
import { random } from 'faker'

export class GetFileByEntityIdUseCaseSpy<EntityType extends EntityModel> implements GetFileByEntityIdUseCase<EntityType> {
  entityId: string
  fileContent: Buffer = Buffer.from(random.words())

  async getById (entityId: string): Promise<Buffer> {
    this.entityId = entityId
    return this.fileContent
  }
}
