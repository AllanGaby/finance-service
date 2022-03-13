import { GetFileByEntityIdUseCase, EntityModel } from '@/domain/common'
import { GetEntityByIdRepository, RepositoryOptionsModel } from '@/protocols/repositories'
import { GetFileInStorageProtocol, FileExistsInStorageProtocol } from '@/protocols/storage'
import { EntityIsNotFoundError } from '@/data/common/errors'

export class DbGetFileByEntityIdUseCase<EntityType extends EntityModel> implements GetFileByEntityIdUseCase<EntityType> {
  constructor (
    private readonly getEntityByIdRepository: GetEntityByIdRepository<EntityType>,
    private readonly entityName: string,
    private readonly fileField: string,
    private readonly fileExistsInStorageAdapter: FileExistsInStorageProtocol,
    private readonly getFileInStorageAdapter: GetFileInStorageProtocol,
    private readonly options: RepositoryOptionsModel = {
      returnDeletedEntities: true
    }
  ) {}

  async getById (entityId: string): Promise<Buffer> {
    const entity = await this.getEntityByIdRepository.getById(entityId, this.options)
    if (!entity) {
      throw new EntityIsNotFoundError(this.entityName)
    }
    const fileName = entity[this.fileField]
    if (fileName) {
      if (await this.fileExistsInStorageAdapter.exists(fileName)) {
        return this.getFileInStorageAdapter.get(fileName)
      }
    }
    return undefined
  }
}
