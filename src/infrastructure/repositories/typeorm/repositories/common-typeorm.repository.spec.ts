import { CommonTypeORMRepository, defaultRepositoryOptionsModel } from './common-typeorm.repository'
import { CustomFilterConditional, mockCustomFilterModel, mockEntityModel, OrderDirection } from '@/domain/common'
import { InvalidForeignKeyError, MissingParamError, RepositoryError, RepositoryErrorType, ViolateUniqueKeyError } from '@/data/common/errors'
import { mockListEntitiesRepositoryDTO, mockRepositoryOptionsModel } from '@/protocols/repositories'
import { DefaultEntity, CommonRepositorySettingsModel } from '@/infrastructure/repositories'
import { TypeOrmRepositorySpy, mockTypeOrmRepositorySettingsModel } from '@/infrastructure/repositories/typeorm/mocks'
import { TypeORMConnection } from '@/infrastructure/repositories/typeorm/connection'
import TypeOrm, { getRepository, JoinOptions, In } from 'typeorm'
import { database, datatype, random } from 'faker'

jest.mock('typeorm', () => ({
  Entity: () => {},
  PrimaryGeneratedColumn: () => {},
  PrimaryColumn: () => {},
  ManyToMany: () => {},
  JoinTable: () => {},
  OneToMany: () => {},
  ManyToOne: () => {},
  JoinColumn: () => {},
  Column: () => {},
  CreateDateColumn: () => {},
  UpdateDateColumn: () => {},
  DeleteDateColumn: () => {},
  In: () => {},
  Like: () => {},
  ILike: () => {},
  getRepository: () => { return new TypeOrmRepositorySpy() }
}))

type sutTypes = {
  sut: CommonTypeORMRepository<DefaultEntity>
}

const makeSut = (settings?: CommonRepositorySettingsModel): sutTypes => {
  const sut = new CommonTypeORMRepository<DefaultEntity>(DefaultEntity, settings)
  jest.spyOn(TypeORMConnection, 'getConnection').mockImplementation(jest.fn())
  sut.repositoryTypeORM = getRepository<DefaultEntity>(DefaultEntity)
  return {
    sut
  }
}

describe('CommonTypeORMRepository', () => {
  describe('Constructor', () => {
    describe('Join', () => {
      test('Should set correct join if join is provided', () => {
        const settings = mockTypeOrmRepositorySettingsModel()
        const { sut } = makeSut(settings)
        expect(sut.join).toBe(settings.join)
      })

      test('Should set correct join if join is not provided', () => {
        const settings = mockTypeOrmRepositorySettingsModel()
        delete settings.join
        const { sut } = makeSut(settings)
        expect(sut.join).toBeFalsy()
      })
    })

    describe('CompleteJoin', () => {
      test('Should set correct completeJoin if completeJoin is provided', () => {
        const settings = mockTypeOrmRepositorySettingsModel()
        const { sut } = makeSut(settings)
        expect(sut.completeJoin).toBe(settings.completeJoin)
      })

      test('Should set correct completeJoin if completeJoin is not provided', () => {
        const settings = mockTypeOrmRepositorySettingsModel()
        delete settings.completeJoin
        const { sut } = makeSut(settings)
        expect(sut.completeJoin).toBeFalsy()
      })
    })

    describe('UseSoftDelete', () => {
      test('Should set correct useSoftDelete if useSoftDelete is provided', () => {
        const settings = mockTypeOrmRepositorySettingsModel()
        const { sut } = makeSut(settings)
        expect(sut.useSoftDelete).toBe(settings.useSoftDelete)
      })

      test('Should set correct useSoftDelete if useSoftDelete is not provided', () => {
        const settings = mockTypeOrmRepositorySettingsModel()
        delete settings.useSoftDelete
        const { sut } = makeSut(settings)
        expect(sut.useSoftDelete).toBeFalsy()
      })
    })

    describe('ColumnsToFilter', () => {
      test('Should set correct columnsToFilter if columnsToFilter is provided', () => {
        const settings = mockTypeOrmRepositorySettingsModel()
        const { sut } = makeSut(settings)
        expect(sut.columnsToFilter).toBe(settings.columnsToFilter)
      })

      test('Should set correct columnsToFilter if columnsToFilter is not provided', () => {
        const settings = mockTypeOrmRepositorySettingsModel()
        delete settings.columnsToFilter
        const { sut } = makeSut(settings)
        expect(sut.columnsToFilter).toEqual([])
      })
    })
  })

  describe('GetJoin Method', () => {
    test('Should return join if returnCompleteData is false', () => {
      const { sut } = makeSut()
      sut.join = random.objectElement<JoinOptions>()
      const result = sut.getJoin(false)
      expect(result).toEqual(sut.join)
    })

    test('Should return join if returnCompleteData is true but completeJoin is undefined', () => {
      const { sut } = makeSut()
      delete sut.completeJoin
      sut.join = random.objectElement<JoinOptions>()
      const result = sut.getJoin(true)
      expect(result).toEqual(sut.join)
    })

    test('Should return completeJoin if returnCompleteData is true but completeJoin is provided', () => {
      const { sut } = makeSut()
      sut.completeJoin = random.objectElement<JoinOptions>()
      const result = sut.getJoin(true)
      expect(result).toEqual(sut.completeJoin)
    })
  })

  describe('GetRepositoryTypeORM Method', () => {
    test('Should not call GetConnection is repositoryTypeORM is provided', async () => {
      const { sut } = makeSut()
      const getConnectionSpy = jest.spyOn(TypeORMConnection, 'getConnection')
      await sut.getRepositoryTypeORM()
      expect(getConnectionSpy).not.toHaveBeenCalled()
    })

    test('Should call GetConnection is repositoryTypeORM is not provided', async () => {
      const { sut } = makeSut()
      delete sut.repositoryTypeORM
      const getConnectionSpy = jest.spyOn(TypeORMConnection, 'getConnection')
      await sut.getRepositoryTypeORM()
      expect(getConnectionSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('CreateRepositoryTypeORM Method', () => {
    test('Should call getRepository with correct value', () => {
      const { sut } = makeSut()
      const getReposutorySpy = jest.spyOn(TypeOrm, 'getRepository')
      sut.createRepositoryTypeORM()
      expect(getReposutorySpy).toHaveBeenCalledWith(DefaultEntity)
    })
  })

  describe('Create Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.create(mockEntityModel())
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call Create with correct values', async () => {
      const { sut } = makeSut()
      const createSpy = jest.spyOn(sut.repositoryTypeORM, 'create')
      const request = mockEntityModel()
      await sut.create(request)
      expect(createSpy).toHaveBeenCalledWith(request)
    })

    test('Should call save with correct values', async () => {
      const { sut } = makeSut()
      const entity = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'create').mockReturnValue(entity)
      const saveSpy = jest.spyOn(sut.repositoryTypeORM, 'save')
      await sut.create(entity)
      expect(saveSpy).toHaveBeenCalledWith(entity)
    })

    test('Should return a new entity if succeeds', async () => {
      const { sut } = makeSut()
      const entity = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'create').mockReturnValue(entity)
      const createdEntity = await sut.create(entity)
      expect(createdEntity).toEqual(entity)
    })

    test('Should throws a MissingParamError if MissingParamError throws on create method', async () => {
      const { sut } = makeSut()
      const missingparamIdName = database.column()
      jest.spyOn(sut.repositoryTypeORM, 'create').mockImplementationOnce(() => {
        throw new RepositoryError(RepositoryErrorType.NotNull, undefined, missingparamIdName)
      })
      const promise = sut.create(mockEntityModel())
      await expect(promise).rejects.toThrowError(MissingParamError)
    })

    test('Should throws a InvalidForeignKeyError if InvalidForeignKeyError throws on create method', async () => {
      const { sut } = makeSut()
      const foreignKeyName = database.column()
      jest.spyOn(sut.repositoryTypeORM, 'create').mockImplementationOnce(() => {
        throw new RepositoryError(RepositoryErrorType.ForeignKey, foreignKeyName)
      })
      const promise = sut.create(mockEntityModel())
      await expect(promise).rejects.toThrowError(InvalidForeignKeyError)
    })

    test('Should throws a ViolateUniqueKeyError if ViolateUniqueKeyError throws on create method', async () => {
      const { sut } = makeSut()
      const uniqueKeyName = database.column()
      jest.spyOn(sut.repositoryTypeORM, 'create').mockImplementationOnce(() => {
        throw new RepositoryError(RepositoryErrorType.UniqueKey, uniqueKeyName)
      })
      const promise = sut.create(mockEntityModel())
      await expect(promise).rejects.toThrowError(ViolateUniqueKeyError)
    })

    test('Should call ThrowCorrectError method with correct params', async () => {
      const { sut } = makeSut()
      const errorMessage = datatype.string()
      const throwCorrectErrorSpy = jest.spyOn(sut, 'throwCorrectError')
      jest.spyOn(sut.repositoryTypeORM, 'create').mockImplementationOnce(() => { throw new Error(errorMessage) })
      await sut.create(mockEntityModel())
      expect(throwCorrectErrorSpy).toHaveBeenCalledWith(new Error(errorMessage))
    })
  })

  describe('GetById Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.getById(datatype.uuid())
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call FindOne with correct value', async () => {
      const { sut } = makeSut()
      const findOneSpy = jest.spyOn(sut.repositoryTypeORM, 'findOne')
      const entityId = datatype.uuid()
      await sut.getById(entityId)
      expect(findOneSpy).toHaveBeenCalledWith(entityId, {
        join: sut.join
      })
    })

    test('Should return same FindOne return', async () => {
      const { sut } = makeSut()
      const entity = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'findOne').mockResolvedValue(entity as DefaultEntity)
      const findEntity = await sut.getById(entity.id)
      expect(findEntity).toEqual(entity)
    })
  })

  describe('GetByOne Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.getOne([mockCustomFilterModel()])
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call GetWhere with correct value', async () => {
      const { sut } = makeSut()
      const getWhereSpy = jest.spyOn(sut, 'getWhere')
      const filters = [mockCustomFilterModel()]
      await sut.getOne(filters)
      expect(getWhereSpy).toHaveBeenCalledWith(filters, undefined)
    })

    describe('Options is provided', () => {
      describe('Join', () => {
        test('Should call getJoin with correct value if useJoin is true', async () => {
          const { sut } = makeSut()
          const options = mockRepositoryOptionsModel()
          options.useJoin = true
          const getJoinSpy = jest.spyOn(sut, 'getJoin')
          await sut.getOne([mockCustomFilterModel()], options)
          expect(getJoinSpy).toHaveBeenCalledWith(options.returnCompleteData)
        })

        test('Should call getJoin with correct value if useJoin is not provided', async () => {
          const { sut } = makeSut()
          const options = mockRepositoryOptionsModel()
          delete options.useJoin
          const getJoinSpy = jest.spyOn(sut, 'getJoin')
          await sut.getOne([mockCustomFilterModel()], options)
          expect(getJoinSpy).toHaveBeenCalledWith(options.returnCompleteData)
        })

        test('Should not call getJoin if useJoin is false', async () => {
          const { sut } = makeSut()
          const options = mockRepositoryOptionsModel()
          options.useJoin = false
          const getJoinSpy = jest.spyOn(sut, 'getJoin')
          await sut.getOne([mockCustomFilterModel()], options)
          expect(getJoinSpy).not.toHaveBeenCalled()
        })

        test('Should call FindOne with correct value if getJoin is called', async () => {
          const { sut } = makeSut()
          const options = mockRepositoryOptionsModel()
          options.useJoin = true
          const join = random.objectElement<JoinOptions>()
          const where = datatype.string()
          jest.spyOn(sut, 'getWhere').mockReturnValue(where)
          jest.spyOn(sut, 'getJoin').mockReturnValue(join)
          const findOneSpy = jest.spyOn(sut.repositoryTypeORM, 'findOne')
          await sut.getOne([mockCustomFilterModel()], options)
          expect(findOneSpy).toHaveBeenCalledWith({
            join,
            withDeleted: options.returnDeletedEntities,
            where
          })
        })

        test('Should call FindOne with correct value if getJoin is not called', async () => {
          const { sut } = makeSut()
          const options = mockRepositoryOptionsModel()
          options.useJoin = false
          const where = datatype.string()
          jest.spyOn(sut, 'getWhere').mockReturnValue(where)
          const findOneSpy = jest.spyOn(sut.repositoryTypeORM, 'findOne')
          await sut.getOne([mockCustomFilterModel()], options)
          expect(findOneSpy).toHaveBeenCalledWith({
            join: undefined,
            withDeleted: options.returnDeletedEntities,
            where
          })
        })

        describe('ReturnCompleteData', () => {
          test('Should call getJoin with correct value if ReturnCompleteData is provided', async () => {
            const { sut } = makeSut()
            const options = mockRepositoryOptionsModel()
            options.useJoin = true
            const getJoinSpy = jest.spyOn(sut, 'getJoin')
            await sut.getOne([mockCustomFilterModel()], options)
            expect(getJoinSpy).toHaveBeenCalledWith(options.returnCompleteData)
          })

          test('Should call getJoin with correct value if ReturnCompleteData is not provided', async () => {
            const { sut } = makeSut()
            const options = mockRepositoryOptionsModel()
            delete options.returnCompleteData
            options.useJoin = true
            const getJoinSpy = jest.spyOn(sut, 'getJoin')
            await sut.getOne([mockCustomFilterModel()], options)
            expect(getJoinSpy).toHaveBeenCalledWith(defaultRepositoryOptionsModel.returnCompleteData)
          })
        })
      })

      describe('ReturnDeletedEntities', () => {
        test('Should call FindOne with correct value if ReturnDeletedEntities is provided', async () => {
          const { sut } = makeSut()
          const options = mockRepositoryOptionsModel()
          const where = datatype.string()
          jest.spyOn(sut, 'getWhere').mockReturnValue(where)
          const findOneSpy = jest.spyOn(sut.repositoryTypeORM, 'findOne')
          await sut.getOne([mockCustomFilterModel()], options)
          expect(findOneSpy).toHaveBeenCalledWith({
            join: undefined,
            withDeleted: options.returnDeletedEntities,
            where
          })
        })

        test('Should call FindOne with correct value if ReturnDeletedEntities is not provided', async () => {
          const { sut } = makeSut()
          const options = mockRepositoryOptionsModel()
          delete options.returnDeletedEntities
          const where = datatype.string()
          jest.spyOn(sut, 'getWhere').mockReturnValue(where)
          const findOneSpy = jest.spyOn(sut.repositoryTypeORM, 'findOne')
          await sut.getOne([mockCustomFilterModel()], options)
          expect(findOneSpy).toHaveBeenCalledWith({
            join: undefined,
            withDeleted: defaultRepositoryOptionsModel.returnDeletedEntities,
            where
          })
        })
      })
    })

    describe('Options is not provided', () => {
      test('Should call FindOne with correct value', async () => {
        const { sut } = makeSut()
        const join = random.objectElement<JoinOptions>()
        const where = datatype.string()
        jest.spyOn(sut, 'getWhere').mockReturnValue(where)
        jest.spyOn(sut, 'getJoin').mockReturnValue(join)
        const findOneSpy = jest.spyOn(sut.repositoryTypeORM, 'findOne')
        await sut.getOne([mockCustomFilterModel()])
        expect(findOneSpy).toHaveBeenCalledWith({
          join,
          withDeleted: defaultRepositoryOptionsModel.returnDeletedEntities,
          where
        })
      })
    })

    test('Should return same FindOne return', async () => {
      const { sut } = makeSut()
      const entity = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'findOne').mockResolvedValue(entity as DefaultEntity)
      const findEntity = await sut.getById(entity.id)
      expect(findEntity).toEqual(entity)
    })
  })

  describe('Delete Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.delete(mockEntityModel())
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call delete with correct value', async () => {
      const { sut } = makeSut()
      const deleteSpy = jest.spyOn(sut.repositoryTypeORM, 'delete')
      const filter = mockEntityModel()
      await sut.delete(filter)
      expect(deleteSpy).toHaveBeenCalledWith(filter)
    })
  })

  describe('DeleteById Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.deleteById(datatype.uuid())
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call delete with correct value', async () => {
      const { sut } = makeSut()
      const deleteSpy = jest.spyOn(sut.repositoryTypeORM, 'delete')
      const entityId = datatype.uuid()
      await sut.deleteById(entityId)
      expect(deleteSpy).toHaveBeenCalledWith(entityId)
    })
  })

  describe('SoftDelete Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.softDelete(mockEntityModel())
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call softDelete with correct value', async () => {
      const { sut } = makeSut()
      const softDeleteSpy = jest.spyOn(sut.repositoryTypeORM, 'softDelete')
      const filter = mockEntityModel()
      await sut.softDelete(filter)
      expect(softDeleteSpy).toHaveBeenCalledWith(filter)
    })
  })

  describe('SoftDeleteById Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.softDeleteById(datatype.uuid())
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call softDelete with correct value', async () => {
      const { sut } = makeSut()
      const softDeleteSpy = jest.spyOn(sut.repositoryTypeORM, 'softDelete')
      const entityId = datatype.uuid()
      await sut.softDeleteById(entityId)
      expect(softDeleteSpy).toHaveBeenCalledWith(entityId)
    })
  })

  describe('Update Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.update(mockEntityModel())
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call FindOne with correct value', async () => {
      const { sut } = makeSut()
      const findOneSpy = jest.spyOn(sut.repositoryTypeORM, 'findOne')
      const request = mockEntityModel()
      await sut.update(request)
      expect(findOneSpy).toHaveBeenCalledWith(request.id)
    })

    test('Should return undefined if account is not found', async () => {
      const { sut } = makeSut()
      jest.spyOn(sut.repositoryTypeORM, 'findOne').mockImplementationOnce(() => { return undefined })
      const updatedAccount = await sut.update(mockEntityModel())
      expect(updatedAccount).toBeFalsy()
    })

    test('Should call save with correct values', async () => {
      const { sut } = makeSut()
      const account = mockEntityModel()
      const request = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'findOne').mockResolvedValue(account)
      const saveSpy = jest.spyOn(sut.repositoryTypeORM, 'save')
      await sut.update(request)
      expect(saveSpy).toHaveBeenCalledWith({
        ...account,
        ...request
      })
    })

    test('Should return a updated account if succeeds', async () => {
      const { sut } = makeSut()
      const account = mockEntityModel()
      const request = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'findOne').mockResolvedValue(account)
      const updatedAccount = await sut.update(request)
      expect(updatedAccount).toEqual({
        ...account,
        ...request
      })
    })

    test('Should throws a MissingParamError if MissingParamError throws on update method', async () => {
      const { sut } = makeSut()
      const account = mockEntityModel()
      const request = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'findOne').mockResolvedValue(account)
      jest.spyOn(sut.repositoryTypeORM, 'save').mockImplementationOnce(() => { throw new RepositoryError(RepositoryErrorType.NotNull) })
      const promise = sut.update(request)
      await expect(promise).rejects.toThrowError(MissingParamError)
    })

    test('Should throws a InvalidForeignKeyError if InvalidForeignKeyError throws on update method', async () => {
      const { sut } = makeSut()
      const account = mockEntityModel()
      const request = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'findOne').mockResolvedValue(account)
      jest.spyOn(sut.repositoryTypeORM, 'save').mockImplementationOnce(() => { throw new RepositoryError(RepositoryErrorType.ForeignKey) })
      const promise = sut.update(request)
      await expect(promise).rejects.toThrowError(InvalidForeignKeyError)
    })

    test('Should throws a ViolateUniqueKeyError if ViolateUniqueKeyError throws on update method', async () => {
      const { sut } = makeSut()
      const account = mockEntityModel()
      const request = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'findOne').mockResolvedValue(account)
      jest.spyOn(sut.repositoryTypeORM, 'save').mockImplementationOnce(() => { throw new RepositoryError(RepositoryErrorType.UniqueKey) })
      const promise = sut.update(request)
      await expect(promise).rejects.toThrowError(ViolateUniqueKeyError)
    })
  })

  describe('GetSearchConditional Method', () => {
    test('Should return undefined if textToSeach is undefined', async () => {
      const { sut } = makeSut()
      const conditional = sut.getSearchConditional(undefined)
      expect(conditional).toBeFalsy()
    })

    test('Should return correct filter if textToSearch is provided', async () => {
      const { sut } = makeSut()
      sut.columnsToFilter = [
        database.column(),
        database.column(),
        database.column(),
        database.column(),
        database.column()
      ]
      const textToSearch = datatype.uuid()
      const conditional = sut.getSearchConditional(textToSearch)
      const where = sut.columnsToFilter.reduce((where, column): string => {
        if (where) {
          return `${where} OR (${column} ilike '%${textToSearch}%')`
        }
        return `(${column} ilike '%${textToSearch}%')`
      }, '')
      expect(conditional).toBe(where)
    })
  })

  describe('GetPostgresSQLConditional Method', () => {
    test('Should return correct value if conditional is equal', () => {
      const { sut } = makeSut()
      const value = datatype.uuid()
      const customConditional = sut.getPostgresSQLConditional(CustomFilterConditional.equal, value)
      expect(customConditional).toBe(` = '${value}'`)
    })

    test('Should return correct value if conditional is in', () => {
      const { sut } = makeSut()
      const value = `${datatype.uuid()},${datatype.uuid()},${datatype.uuid()}`
      const customConditional = sut.getPostgresSQLConditional(CustomFilterConditional.in, value)
      expect(customConditional).toBe(` in (${value.toString().split(',').map(item => `'${item}'`).join(',')})`)
    })

    test('Should return correct value if conditional is notIn', () => {
      const { sut } = makeSut()
      const value = `${datatype.uuid()},${datatype.uuid()},${datatype.uuid()}`
      const customConditional = sut.getPostgresSQLConditional(CustomFilterConditional.notIn, value)
      expect(customConditional).toBe(` not in (${value.toString().split(',').map(item => `'${item}'`).join(',')})`)
    })

    test('Should return correct value if conditional is different', () => {
      const { sut } = makeSut()
      const value = datatype.uuid()
      const customConditional = sut.getPostgresSQLConditional(CustomFilterConditional.different, value)
      expect(customConditional).toBe(` <> '${value}'`)
    })

    test('Should return correct value if conditional is bigger than', () => {
      const { sut } = makeSut()
      const value = datatype.uuid()
      const customConditional = sut.getPostgresSQLConditional(CustomFilterConditional.biggerThan, value)
      expect(customConditional).toBe(` > '${value}'`)
    })

    test('Should return correct value if conditional is bigger than or equal', () => {
      const { sut } = makeSut()
      const value = datatype.uuid()
      const customConditional = sut.getPostgresSQLConditional(CustomFilterConditional.biggerThanOrEqual, value)
      expect(customConditional).toBe(` >= '${value}'`)
    })

    test('Should return correct value if conditional is smaller than', () => {
      const { sut } = makeSut()
      const value = datatype.uuid()
      const customConditional = sut.getPostgresSQLConditional(CustomFilterConditional.smallerThan, value)
      expect(customConditional).toBe(` < '${value}'`)
    })

    test('Should return correct value if conditional is smaller than or equal', () => {
      const { sut } = makeSut()
      const value = datatype.uuid()
      const customConditional = sut.getPostgresSQLConditional(CustomFilterConditional.smallerThanOrEqual, value)
      expect(customConditional).toBe(` <= '${value}'`)
    })

    test('Should return correct value if conditional is start with', () => {
      const { sut } = makeSut()
      const value = datatype.uuid()
      const customConditional = sut.getPostgresSQLConditional(CustomFilterConditional.startWith, value)
      expect(customConditional).toBe(` ilike '${value}%'`)
    })

    test('Should return correct value if conditional is not start with', () => {
      const { sut } = makeSut()
      const value = datatype.uuid()
      const customConditional = sut.getPostgresSQLConditional(CustomFilterConditional.notStartWith, value)
      expect(customConditional).toBe(` not ilike '${value}%'`)
    })

    test('Should return correct value if conditional is contains', () => {
      const { sut } = makeSut()
      const value = datatype.uuid()
      const customConditional = sut.getPostgresSQLConditional(CustomFilterConditional.contains, value)
      expect(customConditional).toBe(` ilike '%${value}%'`)
    })

    test('Should return correct value if conditional is not contains', () => {
      const { sut } = makeSut()
      const value = datatype.uuid()
      const customConditional = sut.getPostgresSQLConditional(CustomFilterConditional.notContains, value)
      expect(customConditional).toBe(` not ilike '%${value}%'`)
    })

    test('Should return correct value if conditional is is empty', () => {
      const { sut } = makeSut()
      const customConditional = sut.getPostgresSQLConditional(CustomFilterConditional.isEmpty, datatype.uuid())
      expect(customConditional).toBe(' is null')
    })

    test('Should return correct value if conditional is not is empty', () => {
      const { sut } = makeSut()
      const customConditional = sut.getPostgresSQLConditional(CustomFilterConditional.notIsEmpty, datatype.uuid())
      expect(customConditional).toBe(' is not null')
    })

    test('Should return correct value if conditional is not provided', () => {
      const { sut } = makeSut()
      const customConditional = sut.getPostgresSQLConditional(undefined, datatype.uuid())
      expect(customConditional).toBe(' is null')
    })
  })

  describe('GetCustomFilter Method', () => {
    test('Should return undefined if filters is nor provided', () => {
      const { sut } = makeSut()
      const result = sut.getCustomFilter(undefined)
      expect(result).toBeFalsy()
    })

    test('Should call getPostgresSQLConditional only for fields in columns to filter', () => {
      const { sut } = makeSut()
      const filters = [
        mockCustomFilterModel(),
        mockCustomFilterModel(),
        mockCustomFilterModel(),
        mockCustomFilterModel(),
        mockCustomFilterModel()
      ]
      sut.columnsToFilter = [
        filters[0].field,
        filters[1].field,
        filters[3].field
      ]
      const getPostgresSQLConditionalSpy = jest.spyOn(sut, 'getPostgresSQLConditional')
      sut.getCustomFilter(filters)
      filters.forEach(filter => {
        if (sut.columnsToFilter.includes(filter.field)) {
          expect(getPostgresSQLConditionalSpy).toHaveBeenCalledWith(filter.conditional, filter.value)
        } else {
          expect(getPostgresSQLConditionalSpy).not.toHaveBeenCalledWith(filter.conditional, filter.value)
        }
      })
    })

    test('Should return correct custom filter if all fields is correct', () => {
      const { sut } = makeSut()
      const filters = [
        mockCustomFilterModel(),
        mockCustomFilterModel(),
        mockCustomFilterModel(),
        mockCustomFilterModel(),
        mockCustomFilterModel()
      ]
      const postgresConditional = datatype.uuid()
      jest.spyOn(sut, 'getPostgresSQLConditional').mockReturnValue(postgresConditional)
      filters.forEach(filter => sut.columnsToFilter.push(filter.field))
      const expectCustomFilter = filters.reduce((where, filter, index): string => {
        const { field } = filter
        const fieldConditional = `(${field} ${postgresConditional})`

        if (where) {
          return `${where} ${filters[index - 1].operator} ${fieldConditional}`
        }
        return fieldConditional
      }, '')
      const customFilter = sut.getCustomFilter(filters)
      expect(customFilter).toBe(expectCustomFilter)
    })

    test('Should return correct custom filter for only columns to filter', () => {
      const { sut } = makeSut()
      const filters = [
        mockCustomFilterModel(),
        mockCustomFilterModel(),
        mockCustomFilterModel(),
        mockCustomFilterModel(),
        mockCustomFilterModel()
      ]
      sut.columnsToFilter = [
        filters[0].field,
        filters[1].field,
        filters[3].field
      ]
      const postgresConditional = datatype.uuid()
      jest.spyOn(sut, 'getPostgresSQLConditional').mockReturnValue(postgresConditional)
      const expectCustomFilter = filters.reduce((where, filter, index): string => {
        const { field } = filter
        if (sut.columnsToFilter.includes(field)) {
          const fieldConditional = `(${field} ${postgresConditional})`

          if (where) {
            return `${where} ${filters[index - 1].operator} ${fieldConditional}`
          }
          return fieldConditional
        }
        return where
      }, '')
      const customFilter = sut.getCustomFilter(filters)
      expect(customFilter).toBe(expectCustomFilter)
    })
  })

  describe('GetWhere Method', () => {
    test('Should call GetSearchConditional with correct value', () => {
      const { sut } = makeSut()
      const getSearchConditionalSpy = jest.spyOn(sut, 'getSearchConditional')
      const textToSeach = datatype.uuid()
      sut.getWhere([mockCustomFilterModel()], textToSeach)
      expect(getSearchConditionalSpy).toBeCalledWith(textToSeach)
    })

    test('Should call GetCustomFilterSpy with correct value', () => {
      const { sut } = makeSut()
      const getCustomFilterSpy = jest.spyOn(sut, 'getCustomFilter')
      const filters = [
        mockCustomFilterModel(),
        mockCustomFilterModel(),
        mockCustomFilterModel()
      ]
      sut.getWhere(filters, datatype.uuid())
      expect(getCustomFilterSpy).toBeCalledWith(filters)
    })

    test('Should return undefined if GetCustomFilter and GetSearchConditional is undefined', () => {
      const { sut } = makeSut()
      jest.spyOn(sut, 'getCustomFilter').mockReturnValueOnce(undefined)
      jest.spyOn(sut, 'getSearchConditional').mockReturnValueOnce(undefined)
      const where = sut.getWhere([mockCustomFilterModel()], datatype.uuid())
      expect(where).toBeFalsy()
    })

    test('Should correct where if GetCustomFilter and GetSearchConditional return value', () => {
      const { sut } = makeSut()
      const customFilter = datatype.uuid()
      const searchConditional = datatype.uuid()
      jest.spyOn(sut, 'getCustomFilter').mockReturnValueOnce(customFilter)
      jest.spyOn(sut, 'getSearchConditional').mockReturnValueOnce(searchConditional)
      const where = sut.getWhere([mockCustomFilterModel()], datatype.uuid())
      expect(where).toBe(`(${customFilter}) AND (${searchConditional})`)
    })

    test('Should correct where if only GetSearchConditional return value', () => {
      const { sut } = makeSut()
      const searchConditional = datatype.uuid()
      jest.spyOn(sut, 'getCustomFilter').mockReturnValueOnce(undefined)
      jest.spyOn(sut, 'getSearchConditional').mockReturnValueOnce(searchConditional)
      const where = sut.getWhere([mockCustomFilterModel()], datatype.uuid())
      expect(where).toBe(searchConditional)
    })

    test('Should correct where if only GetCustomFilter return value', () => {
      const { sut } = makeSut()
      const customFilter = datatype.uuid()
      jest.spyOn(sut, 'getCustomFilter').mockReturnValueOnce(customFilter)
      jest.spyOn(sut, 'getSearchConditional').mockReturnValueOnce(undefined)
      const where = sut.getWhere([mockCustomFilterModel()], datatype.uuid())
      expect(where).toBe(customFilter)
    })
  })

  describe('Count Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.count(datatype.uuid(), [])
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call GetWhere with correct values', async () => {
      const { sut } = makeSut()
      const getWhereSpy = jest.spyOn(sut, 'getWhere')
      const filters = [
        mockCustomFilterModel(),
        mockCustomFilterModel(),
        mockCustomFilterModel()
      ]
      const textToSeach = datatype.uuid()
      await sut.count(textToSeach, filters)
      expect(getWhereSpy).toHaveBeenCalledWith(filters, textToSeach)
    })

    test('Should call Count with correct value if join is defined', async () => {
      const { sut } = makeSut()
      sut.join = random.objectElement<JoinOptions>()
      const where = datatype.uuid()
      jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
      const countSpy = jest.spyOn(sut.repositoryTypeORM, 'count')
      await sut.count(datatype.uuid(), [mockCustomFilterModel()])
      expect(countSpy).toHaveBeenCalledWith({
        where,
        join: sut.join
      })
    })

    test('Should call Count with correct value if join is defined', async () => {
      const { sut } = makeSut()
      const where = datatype.uuid()
      jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
      const countSpy = jest.spyOn(sut.repositoryTypeORM, 'count')
      await sut.count(datatype.uuid(), [mockCustomFilterModel()])
      expect(countSpy).toHaveBeenCalledWith({
        where
      })
    })

    test('Should call Find with correct value without textToSearch', async () => {
      const { sut } = makeSut()
      const findSpy = jest.spyOn(sut.repositoryTypeORM, 'count')
      await sut.count()
      expect(findSpy).toHaveBeenCalledWith({
        where: undefined
      })
    })

    test('Should return same Find return', async () => {
      const { sut } = makeSut()
      const count = datatype.number()
      jest.spyOn(sut.repositoryTypeORM, 'count').mockResolvedValue(count)
      const recordCount = await sut.count(datatype.string())
      expect(recordCount).toBe(count)
    })
  })

  describe('List Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.list(mockListEntitiesRepositoryDTO())
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    describe('Filter is not provided', () => {
      test('Should call GetWhere with correct values', async () => {
        const { sut } = makeSut()
        const getWhereSpy = jest.spyOn(sut, 'getWhere')
        await sut.list()
        expect(getWhereSpy).toHaveBeenCalledWith(undefined, '')
      })

      test('Should call Find with correct value', async () => {
        const { sut } = makeSut()
        const where = datatype.uuid()
        jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
        const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
        await sut.list()
        expect(findSpy).toHaveBeenCalledWith({
          where,
          skip: 0,
          order: {
            created_at: OrderDirection.ASC
          }
        })
      })
    })

    describe('Filter is provided', () => {
      test('Should call GetWhere with correct values', async () => {
        const { sut } = makeSut()
        const getWhereSpy = jest.spyOn(sut, 'getWhere')
        const request = mockListEntitiesRepositoryDTO()
        await sut.list(request)
        expect(getWhereSpy).toHaveBeenCalledWith(request.filters, request.textToSearch)
      })

      describe('Order', () => {
        test('Should call Find with correct value if order is not provided', async () => {
          const { sut } = makeSut()
          const where = datatype.uuid()
          jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
          const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
          const request = mockListEntitiesRepositoryDTO()
          delete request.orderColumn
          await sut.list(request)
          const { skip, recordsPerPage } = request
          expect(findSpy).toHaveBeenCalledWith({
            where,
            skip,
            take: recordsPerPage,
            order: {
              created_at: request.orderDirection
            }
          })
        })

        test('Should call Find with correct value if order is provided', async () => {
          const { sut } = makeSut()
          const where = datatype.uuid()
          jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
          const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
          const request = mockListEntitiesRepositoryDTO()
          await sut.list(request)
          const { skip, recordsPerPage, orderColumn, orderDirection } = request
          expect(findSpy).toHaveBeenCalledWith({
            where,
            skip,
            take: recordsPerPage,
            order: {
              [orderColumn]: orderDirection
            }
          })
        })
      })

      describe('Order Direction', () => {
        test('Should call Find with correct value if order direction is not provided', async () => {
          const { sut } = makeSut()
          const where = datatype.uuid()
          jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
          const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
          const request = mockListEntitiesRepositoryDTO()
          delete request.orderDirection
          await sut.list(request)
          const { skip, recordsPerPage, orderColumn } = request
          expect(findSpy).toHaveBeenCalledWith({
            where,
            skip,
            take: recordsPerPage,
            order: {
              [orderColumn]: OrderDirection.ASC
            }
          })
        })

        test('Should call Find with correct value if order direction is provided', async () => {
          const { sut } = makeSut()
          const where = datatype.uuid()
          jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
          const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
          const request = mockListEntitiesRepositoryDTO()
          await sut.list(request)
          const { skip, recordsPerPage, orderColumn, orderDirection } = request
          expect(findSpy).toHaveBeenCalledWith({
            where,
            skip,
            take: recordsPerPage,
            order: {
              [orderColumn]: orderDirection
            }
          })
        })
      })

      describe('Join', () => {
        test('Should call Find with correct value if join is provided', async () => {
          const { sut } = makeSut()
          sut.join = random.objectElement<JoinOptions>()
          const where = datatype.uuid()
          jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
          const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
          const request = mockListEntitiesRepositoryDTO()
          await sut.list(request)
          const { skip, recordsPerPage, orderColumn, orderDirection } = request
          expect(findSpy).toHaveBeenCalledWith({
            join: sut.join,
            where,
            skip,
            take: recordsPerPage,
            order: {
              [orderColumn]: orderDirection
            }
          })
        })

        test('Should call Find with correct value if join is not provided', async () => {
          const { sut } = makeSut()
          const where = datatype.uuid()
          jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
          const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
          const request = mockListEntitiesRepositoryDTO()
          await sut.list(request)
          const { skip, recordsPerPage, orderColumn, orderDirection } = request
          expect(findSpy).toHaveBeenCalledWith({
            where,
            skip,
            take: recordsPerPage,
            order: {
              [orderColumn]: orderDirection
            }
          })
        })
      })

      describe('Where', () => {
        test('Should call Find with correct value if GetWhere return a value', async () => {
          const { sut } = makeSut()
          sut.join = random.objectElement<JoinOptions>()
          const where = datatype.uuid()
          jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
          const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
          const request = mockListEntitiesRepositoryDTO()
          await sut.list(request)
          const { skip, recordsPerPage, orderColumn, orderDirection } = request
          expect(findSpy).toHaveBeenCalledWith({
            join: sut.join,
            where,
            skip,
            take: recordsPerPage,
            order: {
              [orderColumn]: orderDirection
            }
          })
        })

        test('Should call Find with correct value if GetWhere return undefined', async () => {
          const { sut } = makeSut()
          sut.join = random.objectElement<JoinOptions>()
          jest.spyOn(sut, 'getWhere').mockReturnValueOnce(undefined)
          const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
          const request = mockListEntitiesRepositoryDTO()
          await sut.list(request)
          const { skip, recordsPerPage, orderColumn, orderDirection } = request
          expect(findSpy).toHaveBeenCalledWith({
            join: sut.join,
            skip,
            take: recordsPerPage,
            order: {
              [orderColumn]: orderDirection
            }
          })
        })
      })
    })

    test('Should return same Find return', async () => {
      const { sut } = makeSut()
      const entity = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'find').mockResolvedValue([entity, entity])
      const findEntity = await sut.list(mockListEntitiesRepositoryDTO())
      expect(findEntity).toEqual([entity, entity])
    })
  })

  describe('ListByListId Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.listByListId([])
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call Find with correct value', async () => {
      const { sut } = makeSut()
      const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
      const listIds = [
        datatype.uuid(),
        datatype.uuid(),
        datatype.uuid()
      ]
      await sut.listByListId(listIds)
      expect(findSpy).toHaveBeenCalledWith({
        join: sut.join,
        where: {
          id: In(listIds)
        }
      })
    })

    test('Should return same Find return', async () => {
      const { sut } = makeSut()
      const entities = [
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel()
      ]
      jest.spyOn(sut.repositoryTypeORM, 'find').mockResolvedValue(entities)
      const list = await sut.listByListId([])
      expect(list).toEqual(entities)
    })
  })

  describe('CreateInBulk Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.createInBulk([mockEntityModel()])
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call Create with correct values for each params items', async () => {
      const { sut } = makeSut()
      const createSpy = jest.spyOn(sut.repositoryTypeORM, 'create')
      const paramsList = [
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel()
      ]
      await sut.createInBulk(paramsList)
      paramsList.forEach(param => {
        expect(createSpy).toHaveBeenCalledWith(param)
      })
    })

    test('Should call save with correct values', async () => {
      const { sut } = makeSut()
      const entity = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'create').mockReturnValue(entity)
      const saveSpy = jest.spyOn(sut.repositoryTypeORM, 'save')
      await sut.createInBulk([mockEntityModel()])
      expect(saveSpy).toHaveBeenCalledWith([entity])
    })

    test('Should return a new entity if succeeds', async () => {
      const { sut } = makeSut()
      const entity = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'create').mockReturnValue(entity)
      const createdEntity = await sut.createInBulk([mockEntityModel()])
      await expect(createdEntity).toEqual([entity])
    })

    test('Should throws a MissingParamError if MissingParamError throws on createInBulk method', async () => {
      const { sut } = makeSut()
      jest.spyOn(sut.repositoryTypeORM, 'save').mockImplementationOnce(() => { throw new RepositoryError(RepositoryErrorType.NotNull) })
      const promise = sut.createInBulk([mockEntityModel()])
      await expect(promise).rejects.toThrowError(MissingParamError)
    })

    test('Should throws a InvalidForeignKeyError if InvalidForeignKeyError throws on createInBulk method', async () => {
      const { sut } = makeSut()
      jest.spyOn(sut.repositoryTypeORM, 'save').mockImplementationOnce(() => { throw new RepositoryError(RepositoryErrorType.ForeignKey) })
      const promise = sut.createInBulk([mockEntityModel()])
      await expect(promise).rejects.toThrowError(InvalidForeignKeyError)
    })

    test('Should throws a ViolateUniqueKeyError if ViolateUniqueKeyError throws on createInBulk method', async () => {
      const { sut } = makeSut()
      jest.spyOn(sut.repositoryTypeORM, 'save').mockImplementationOnce(() => { throw new RepositoryError(RepositoryErrorType.UniqueKey) })
      const promise = sut.createInBulk([mockEntityModel()])
      await expect(promise).rejects.toThrowError(ViolateUniqueKeyError)
    })
  })

  describe('DeleteByListId Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.deleteByListId([datatype.uuid()])
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call delete with correct value', async () => {
      const { sut } = makeSut()
      const deleteSpy = jest.spyOn(sut.repositoryTypeORM, 'delete')
      const entityIdList = [
        datatype.uuid(),
        datatype.uuid(),
        datatype.uuid()
      ]
      await sut.deleteByListId(entityIdList)
      expect(deleteSpy).toHaveBeenCalledWith(entityIdList)
    })
  })

  describe('SoftDeleteByListId Method', () => {
    test('Should call GetRepositoryTypeORM method', async () => {
      const { sut } = makeSut()
      const getRepositoryTypeORMSpy = jest.spyOn(sut, 'getRepositoryTypeORM')
      await sut.softDeleteByListId([datatype.uuid()])
      expect(getRepositoryTypeORMSpy).toHaveBeenCalledTimes(1)
    })

    test('Should call softDelete with correct value', async () => {
      const { sut } = makeSut()
      const deleteSpy = jest.spyOn(sut.repositoryTypeORM, 'softDelete')
      const entityIdList = [
        datatype.uuid(),
        datatype.uuid(),
        datatype.uuid()
      ]
      await sut.softDeleteByListId(entityIdList)
      expect(deleteSpy).toHaveBeenCalledWith(entityIdList)
    })
  })
})
