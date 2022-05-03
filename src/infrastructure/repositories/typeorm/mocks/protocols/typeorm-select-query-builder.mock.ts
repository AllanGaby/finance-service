export class TypeOrmSelectQueryBuilderSpy {
  static instance: TypeOrmSelectQueryBuilderSpy

  static getInstance (): TypeOrmSelectQueryBuilderSpy {
    if (!TypeOrmSelectQueryBuilderSpy.instance) {
      TypeOrmSelectQueryBuilderSpy.instance = new TypeOrmSelectQueryBuilderSpy()
    }
    return TypeOrmSelectQueryBuilderSpy.instance
  }

  leftJoinAndSelect (property: string, alias: string): TypeOrmSelectQueryBuilderSpy {
    return TypeOrmSelectQueryBuilderSpy.getInstance()
  }

  innerJoinAndSelect (property: string, alias: string): TypeOrmSelectQueryBuilderSpy {
    return TypeOrmSelectQueryBuilderSpy.getInstance()
  }

  orderBy (order: object): TypeOrmSelectQueryBuilderSpy {
    return TypeOrmSelectQueryBuilderSpy.getInstance()
  }

  where (filter: object): TypeOrmSelectQueryBuilderSpy {
    return TypeOrmSelectQueryBuilderSpy.getInstance()
  }

  skip (skip: number): TypeOrmSelectQueryBuilderSpy {
    return TypeOrmSelectQueryBuilderSpy.getInstance()
  }

  withDeleted (): TypeOrmSelectQueryBuilderSpy {
    return TypeOrmSelectQueryBuilderSpy.getInstance()
  }

  take (recordsPerPage: number): TypeOrmSelectQueryBuilderSpy {
    return TypeOrmSelectQueryBuilderSpy.getInstance()
  }

  getMany (): any {
    return undefined
  }
}
