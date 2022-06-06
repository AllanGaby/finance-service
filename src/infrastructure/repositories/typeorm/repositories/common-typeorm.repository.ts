import {
  RepositoryOptionsModel,
  CountEntitiesRepository,
  CreateEntityInBulkRepository,
  CreateEntityRepository,
  DeleteEntitiesByListIdRepository,
  DeleteEntityByIdRepository,
  DeleteEntityRepository,
  GetEntityByIdRepository,
  GetOneEntityRepository,
  ListEntitiesRepository,
  SoftDeleteEntitiesByListIdRepository,
  SoftDeleteEntityByIdRepository,
  SoftDeleteEntityRepository,
  UpdateEntityRepository,
  ListEntitiesRepositoryDTO
} from '@/protocols/repositories'
import { CreateEntityDTO, CustomFilterConditional, CustomFilterModel } from '@/domain/common'
import { InvalidForeignKeyError, MissingParamError, RepositoryError, RepositoryErrorType, ViolateUniqueKeyError } from '@/data/common/errors'
import { TypeORMConnection } from '@/infrastructure/repositories/typeorm/connection'
import { DefaultEntity, TypeOrmRepositorySettingsModel } from '@/infrastructure/repositories'
import { DeepPartial, EntityTarget, FindManyOptions, getRepository, In, JoinOptions, Repository } from 'typeorm'

export const defaultRepositoryOptionsModel: RepositoryOptionsModel = {
  returnDeletedEntities: false,
  returnCompleteData: false,
  useJoin: true
}

export class CommonTypeORMRepository<EntityType extends DefaultEntity>
implements CountEntitiesRepository<EntityType>,
 CreateEntityInBulkRepository<EntityType>,
 CreateEntityRepository<EntityType>,
 DeleteEntitiesByListIdRepository<EntityType>,
 DeleteEntityByIdRepository<EntityType>,
 DeleteEntityRepository<EntityType>,
 GetEntityByIdRepository<EntityType>,
 GetOneEntityRepository<EntityType>,
 ListEntitiesRepository<EntityType>,
 SoftDeleteEntitiesByListIdRepository<EntityType>,
 SoftDeleteEntityByIdRepository<EntityType>,
 SoftDeleteEntityRepository<EntityType>,
 UpdateEntityRepository<EntityType> {
  public repositoryTypeORM: Repository<EntityType>
  public columnsToFilter: string[] = []
  public columnsToSearch: string[] = []
  public join?: JoinOptions
  public completeJoin?: JoinOptions
  public useSoftDelete: boolean = false

  constructor (
    private readonly entityClass: EntityTarget<EntityType>,
    private readonly settings?: TypeOrmRepositorySettingsModel
  ) {
    this.join = this.settings?.join
    this.completeJoin = this.settings?.completeJoin
    this.useSoftDelete = this.settings?.useSoftDelete || false
    this.columnsToFilter = this.settings?.columnsToFilter || []
    this.columnsToSearch = this.settings?.columnsToSearch || this.columnsToFilter
  }

  createRepositoryTypeORM (): Repository<EntityType> {
    return getRepository<EntityType>(this.entityClass)
  }

  getJoin (returnCompleteData: boolean): JoinOptions {
    if ((returnCompleteData) && (this.completeJoin)) {
      return this.completeJoin
    }
    return this.join
  }

  async getRepositoryTypeORM (): Promise<Repository<EntityType>> {
    if (!this.repositoryTypeORM) {
      await TypeORMConnection.getConnection()
      this.repositoryTypeORM = this.createRepositoryTypeORM()
    }
    return this.repositoryTypeORM
  }

  getPostgresSQLConditional (customConditional: CustomFilterConditional, value: string | number | string[] | number[]): string {
    switch (customConditional) {
      case CustomFilterConditional.in:
        return ` in (${value.toString().split(',').map(item => `'${item}'`).join(',')})`
      case CustomFilterConditional.notIn:
        return ` not in (${value.toString().split(',').map(item => `'${item}'`).join(',')})`
      case CustomFilterConditional.equal:
        return ` = '${value}'`
      case CustomFilterConditional.different:
        return ` <> '${value}'`
      case CustomFilterConditional.biggerThan:
        return ` > '${value}'`
      case CustomFilterConditional.biggerThanOrEqual:
        return ` >= '${value}'`
      case CustomFilterConditional.smallerThan:
        return ` < '${value}'`
      case CustomFilterConditional.smallerThanOrEqual:
        return ` <= '${value}'`
      case CustomFilterConditional.startWith:
        return ` ilike '${value}%'`
      case CustomFilterConditional.notStartWith:
        return ` not ilike '${value}%'`
      case CustomFilterConditional.contains:
        return ` ilike '%${value}%'`
      case CustomFilterConditional.notContains:
        return ` not ilike '%${value}%'`
      case CustomFilterConditional.isEmpty:
        return ' is null'
      case CustomFilterConditional.notIsEmpty:
        return ' is not null'
      default:
        return ' is null'
    }
  }

  getCustomFilter (filters: CustomFilterModel[]): string {
    if (!filters) {
      return undefined
    }
    return filters.reduce((where, filter, index): string => {
      const { field, value, conditional } = filter
      if (this.columnsToFilter.includes(field)) {
        const fieldConditional = `(${field} ${this.getPostgresSQLConditional(conditional, value)})`

        if (where) {
          return `${where} ${filters[index - 1].operator} ${fieldConditional}`
        }
        return fieldConditional
      }
      return where
    }, '')
  }

  getSearchConditional (textToSearch: string): string {
    if (!textToSearch) {
      return undefined
    }

    return this.columnsToSearch.reduce((where, column): string => {
      const fieldConditional = `(${column} ilike '%${textToSearch}%')`
      if (where) {
        return `${where} OR ${fieldConditional}`
      }
      return fieldConditional
    }, '')
  }

  getWhere (filters: CustomFilterModel[], textToSearch: string): string {
    const searchConditional = this.getSearchConditional(textToSearch)
    const customFilter = this.getCustomFilter(filters)
    if ((customFilter) && (searchConditional)) {
      return `(${customFilter}) AND (${searchConditional})`
    }
    return customFilter || searchConditional
  }

  throwCorrectError (error: RepositoryError): void {
    switch (error.code) {
      case RepositoryErrorType.NotNull:
        throw new MissingParamError(error.column)
      case RepositoryErrorType.ForeignKey:
        throw new InvalidForeignKeyError(error.constraint)
      case RepositoryErrorType.UniqueKey:
        throw new ViolateUniqueKeyError(error.constraint)
    }
  }

  async getOne (filters: CustomFilterModel[], options?: RepositoryOptionsModel): Promise<EntityType> {
    let useJoin = defaultRepositoryOptionsModel.useJoin
    let returnCompleteData = defaultRepositoryOptionsModel.returnCompleteData
    let returnDeletedEntities = defaultRepositoryOptionsModel.returnDeletedEntities
    if ((options) && (Object.keys(options).includes('useJoin'))) {
      useJoin = options.useJoin
    }
    if ((options) && (Object.keys(options).includes('returnCompleteData'))) {
      returnCompleteData = options.returnCompleteData
    }
    if ((options) && (Object.keys(options).includes('returnDeletedEntities'))) {
      returnDeletedEntities = options.returnDeletedEntities
    }
    const repository = await this.getRepositoryTypeORM()
    const where = this.getWhere(filters, undefined)
    return repository.findOne({
      join: useJoin
        ? this.getJoin(returnCompleteData)
        : undefined,
      withDeleted: returnDeletedEntities,
      where
    })
  }

  async getById (entityId: string): Promise<EntityType> {
    const repository = await this.getRepositoryTypeORM()
    return repository.findOne(entityId, {
      join: this.join
    })
  }

  async deleteById (entityId: string): Promise<EntityType | undefined> {
    const repository = await this.getRepositoryTypeORM()
    await repository.delete(entityId)
    return undefined
  }

  async softDeleteById (entityId: string): Promise<EntityType | undefined> {
    const repository = await this.getRepositoryTypeORM()
    await repository.softDelete(entityId)
    return undefined
  }

  async delete (filter: Partial<EntityType>): Promise<EntityType | undefined> {
    const repository = await this.getRepositoryTypeORM()
    const mappedFilters = {}
    Object.keys(filter).forEach(key => {
      mappedFilters[key] = filter[key]
    })
    await repository.delete(mappedFilters)
    return undefined
  }

  async softDelete (filter: Partial<EntityType>): Promise<EntityType | undefined> {
    const repository = await this.getRepositoryTypeORM()
    const mappedFilters = {}
    Object.keys(filter).forEach(key => {
      mappedFilters[key] = filter[key]
    })
    await repository.softDelete(mappedFilters)
    return undefined
  }

  async create (params: CreateEntityDTO<EntityType>): Promise<EntityType> {
    const repository = await this.getRepositoryTypeORM()
    try {
      const createdEntity = repository.create(params as DeepPartial<EntityType>)
      await repository.save<any>(createdEntity)
      return createdEntity
    } catch (error) {
      this.throwCorrectError(error)
    }
  }

  async update (params: Partial<EntityType>): Promise<EntityType> {
    const repository = await this.getRepositoryTypeORM()
    const entity = await repository.findOne(params.id)
    if (!entity) {
      return undefined
    }
    Object.keys(entity).forEach(key => {
      entity[key] = params[key]
    })
    try {
      await repository.save<any>(entity)
      return entity
    } catch (error) {
      this.throwCorrectError(error)
    }
  }

  async count (textToSearch?: string, filters?: CustomFilterModel[]): Promise<number | EntityType> {
    const repository = await this.getRepositoryTypeORM()
    const options: FindManyOptions = {}
    const where = this.getWhere(filters, textToSearch)
    if (where) {
      options.where = where
    }
    if (this.join) {
      options.join = this.join
    }
    return repository.count(options)
  }

  async list (filter: ListEntitiesRepositoryDTO, options: RepositoryOptionsModel = defaultRepositoryOptionsModel): Promise<EntityType[]> {
    const textToSearch = filter?.textToSearch || ''
    const skip = filter?.skip || 0
    const filters = filter?.filters || []
    const order = filter?.order || undefined
    const recordsPerPage = filter?.recordsPerPage || 25
    const repository = await this.getRepositoryTypeORM()
    const usedJoin = this.getJoin(options.returnCompleteData)
    let queryBuilder = repository.createQueryBuilder(usedJoin?.alias || 'entity')
    if (options.returnDeletedEntities) {
      queryBuilder = queryBuilder.withDeleted()
    }
    if (usedJoin?.leftJoinAndSelect) {
      const leftJoinsKeys = Object.keys(usedJoin.leftJoinAndSelect)
      if (leftJoinsKeys.length > 0) {
        const leftJoinsValues = Object.values(usedJoin.leftJoinAndSelect)
        leftJoinsKeys.forEach((key, index) => {
          queryBuilder = queryBuilder.leftJoinAndSelect(leftJoinsValues[index], key)
        })
      }
    }
    if (usedJoin?.innerJoinAndSelect) {
      const innerJoinsKeys = Object.keys(usedJoin.innerJoinAndSelect)
      if (innerJoinsKeys.length > 0) {
        const innerJoinsValues = Object.values(usedJoin.innerJoinAndSelect)
        innerJoinsKeys.forEach((key, index) => {
          queryBuilder = queryBuilder.innerJoinAndSelect(innerJoinsValues[index], key)
        })
      }
    }
    if (order) {
      queryBuilder = queryBuilder.orderBy(order)
    }
    queryBuilder
      .where(this.getWhere(filters, textToSearch) || {})
      .skip(skip)
      .take(recordsPerPage)
    return queryBuilder.getMany()
  }

  async listByListId (listIds: string[]): Promise<EntityType[]> {
    const repository = await this.getRepositoryTypeORM()
    return repository.find({
      join: this.join,
      where: {
        id: In(listIds)
      }
    })
  }

  async createInBulk (listParams: Array<CreateEntityDTO<EntityType>>): Promise<EntityType[]> {
    const repository = await this.getRepositoryTypeORM()
    const createdEntityList: EntityType[] = []
    try {
      listParams.forEach(params => {
        const createEntity = repository.create(params as DeepPartial<EntityType>)
        createdEntityList.push(createEntity)
      })
      await repository.save<any>(createdEntityList)
      return createdEntityList
    } catch (error) {
      this.throwCorrectError(error)
    }
  }

  async deleteByListId (listIds: string[]): Promise<EntityType | undefined> {
    const repository = await this.getRepositoryTypeORM()
    await repository.delete(listIds)
    return undefined
  }

  async softDeleteByListId (listIds: string[]): Promise<EntityType | undefined> {
    const repository = await this.getRepositoryTypeORM()
    await repository.softDelete(listIds)
    return undefined
  }
}
