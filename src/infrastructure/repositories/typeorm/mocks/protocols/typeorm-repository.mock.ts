import { TypeOrmSelectQueryBuilderSpy } from '@/infrastructure/repositories/typeorm/mocks'

export class TypeOrmRepositorySpy<Entity = object> {
  static instance: TypeOrmRepositorySpy
  static queryBuilder: TypeOrmSelectQueryBuilderSpy

  static getInstance (): TypeOrmRepositorySpy {
    if (!TypeOrmRepositorySpy.instance) {
      TypeOrmRepositorySpy.instance = new TypeOrmRepositorySpy()
    }
    return TypeOrmRepositorySpy.instance
  }

  createQueryBuilder (alias: string): TypeOrmSelectQueryBuilderSpy {
    if (!TypeOrmRepositorySpy.queryBuilder) {
      TypeOrmRepositorySpy.queryBuilder = TypeOrmSelectQueryBuilderSpy.getInstance()
    }
    return TypeOrmRepositorySpy.queryBuilder
  }

  create (entity: Entity): Entity {
    return entity
  }

  save (entity: Entity): Entity {
    return entity
  }

  findOne (options?: any): Entity {
    return undefined
  }

  find (options?: any): Entity[] {
    return undefined
  }

  delete (options?: any): void {
    return undefined
  }

  count (options?: any): number {
    return 0
  }

  softDelete (options?: any): number {
    return 0
  }

  query (sql: string): any {
    return undefined
  }
}
