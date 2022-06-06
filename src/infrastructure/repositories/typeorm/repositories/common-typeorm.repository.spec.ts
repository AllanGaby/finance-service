import { CommonTypeORMRepository, defaultRepositoryOptionsModel } from './common-typeorm.repository'
import { CustomFilterConditional, mockCustomFilterModel, mockEntityModel, mockListOrderModel } from '@/domain/common'
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

    describe('ColumnsToSearch is provided', () => {
      test('Should return correct filter if textToSearch is provided', async () => {
        const settings = mockTypeOrmRepositorySettingsModel()
        const { sut } = makeSut(settings)
        const textToSearch = datatype.uuid()
        const conditional = sut.getSearchConditional(textToSearch)
        const where = settings.columnsToSearch.reduce((where, column): string => {
          if (where) {
            return `${where} OR (${column} ilike '%${textToSearch}%')`
          }
          return `(${column} ilike '%${textToSearch}%')`
        }, '')
        expect(conditional).toBe(where)
      })
    })

    describe('ColumnsToSearch not is provided', () => {
      test('Should return correct filter if textToSearch is provided', async () => {
        const settings = mockTypeOrmRepositorySettingsModel()
        delete settings.columnsToSearch
        const { sut } = makeSut(settings)
        const textToSearch = datatype.uuid()
        const conditional = sut.getSearchConditional(textToSearch)
        const where = settings.columnsToFilter.reduce((where, column): string => {
          if (where) {
            return `${where} OR (${column} ilike '%${textToSearch}%')`
          }
          return `(${column} ilike '%${textToSearch}%')`
        }, '')
        expect(conditional).toBe(where)
      })
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

    describe('GetJoin', () => {
      test('Should call getJoin with correct value if options is not provided', async () => {
        const { sut } = makeSut()
        const getJoinSpy = jest.spyOn(sut, 'getJoin')
        await sut.list(mockListEntitiesRepositoryDTO())
        expect(getJoinSpy).toHaveBeenCalledWith(defaultRepositoryOptionsModel.returnCompleteData)
      })

      test('Should call getJoin with correct value if options is provided', async () => {
        const { sut } = makeSut()
        const getJoinSpy = jest.spyOn(sut, 'getJoin')
        const options = mockRepositoryOptionsModel()
        await sut.list(mockListEntitiesRepositoryDTO(), options)
        expect(getJoinSpy).toHaveBeenCalledWith(options.returnCompleteData)
      })
    })

    test('Should call CreateQueryBuilder with correct value if join is provided', async () => {
      const { sut } = makeSut()
      sut.join = {
        alias: datatype.uuid()
      }
      const createQueryBuilderSpy = jest.spyOn(sut.repositoryTypeORM, 'createQueryBuilder')
      await sut.list(mockListEntitiesRepositoryDTO())
      expect(createQueryBuilderSpy).toHaveBeenCalledWith(sut.join.alias)
    })

    test('Should call CreateQueryBuilder with correct value if join is not provided', async () => {
      const { sut } = makeSut()
      delete sut.join
      const createQueryBuilderSpy = jest.spyOn(sut.repositoryTypeORM, 'createQueryBuilder')
      await sut.list(mockListEntitiesRepositoryDTO())
      expect(createQueryBuilderSpy).toHaveBeenCalledWith('entity')
    })

    describe('GetWhere', () => {
      test('Should call GetWhere with correct values if filters and textToSearch is provided', async () => {
        const { sut } = makeSut()
        const getWhereSpy = jest.spyOn(sut, 'getWhere')
        const request = mockListEntitiesRepositoryDTO()
        await sut.list(request)
        expect(getWhereSpy).toHaveBeenCalledWith(request.filters, request.textToSearch)
      })

      test('Should call GetWhere with correct values if only textToSearch is provided', async () => {
        const { sut } = makeSut()
        const getWhereSpy = jest.spyOn(sut, 'getWhere')
        const request = mockListEntitiesRepositoryDTO()
        delete request.filters
        await sut.list(request)
        expect(getWhereSpy).toHaveBeenCalledWith([], request.textToSearch)
      })

      test('Should call GetWhere with correct values if only filters is provided', async () => {
        const { sut } = makeSut()
        const getWhereSpy = jest.spyOn(sut, 'getWhere')
        const request = mockListEntitiesRepositoryDTO()
        delete request.textToSearch
        await sut.list(request)
        expect(getWhereSpy).toHaveBeenCalledWith(request.filters, '')
      })

      test('Should call GetWhere with correct values if filters and textToSearch are not provided', async () => {
        const { sut } = makeSut()
        const getWhereSpy = jest.spyOn(sut, 'getWhere')
        const request = mockListEntitiesRepositoryDTO()
        delete request.filters
        delete request.textToSearch
        await sut.list(request)
        expect(getWhereSpy).toHaveBeenCalledWith([], '')
      })

      test('Should call GetWhere with correct values if filter is not provided', async () => {
        const { sut } = makeSut()
        const getWhereSpy = jest.spyOn(sut, 'getWhere')
        await sut.list(undefined)
        expect(getWhereSpy).toHaveBeenCalledWith([], '')
      })
    })

    describe('Order', () => {
      test('Should not call OrderBy if order is not provided', async () => {
        const { sut } = makeSut()
        const orderBySpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'orderBy')
        const request = mockListEntitiesRepositoryDTO()
        delete request.order
        await sut.list(request)
        expect(orderBySpy).not.toHaveBeenCalled()
      })

      test('Should not call OrderBy if filters is not provided', async () => {
        const { sut } = makeSut()
        const orderBySpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'orderBy')
        await sut.list(undefined)
        expect(orderBySpy).not.toHaveBeenCalled()
      })

      test('Should call OrderBy with correct value if order provided', async () => {
        const { sut } = makeSut()
        const orderBySpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'orderBy')
        const request = mockListEntitiesRepositoryDTO()
        request.order = mockListOrderModel()
        await sut.list(request)
        expect(orderBySpy).toHaveBeenCalledWith(request.order)
      })
    })

    describe('Join', () => {
      describe('LeftJoin', () => {
        test('Should not call LeftJoinAndSelect if join is not provided', async () => {
          const { sut } = makeSut()
          delete sut.join
          const leftJoinAndSelectSpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'leftJoinAndSelect')
          const request = mockListEntitiesRepositoryDTO()
          await sut.list(request)
          expect(leftJoinAndSelectSpy).not.toHaveBeenCalled()
        })

        test('Should not call LeftJoinAndSelect if join is provided without leftJoinAndSelect', async () => {
          const { sut } = makeSut()
          sut.join = {
            alias: datatype.uuid()
          }
          const leftJoinAndSelectSpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'leftJoinAndSelect')
          const request = mockListEntitiesRepositoryDTO()
          await sut.list(request)
          expect(leftJoinAndSelectSpy).not.toHaveBeenCalled()
        })

        test('Should not call LeftJoinAndSelect if join is provided with empty leftJoinAndSelect', async () => {
          const { sut } = makeSut()
          sut.join = {
            alias: datatype.uuid(),
            leftJoinAndSelect: {}
          }
          const leftJoinAndSelectSpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'leftJoinAndSelect')
          const request = mockListEntitiesRepositoryDTO()
          await sut.list(request)
          expect(leftJoinAndSelectSpy).not.toHaveBeenCalled()
        })

        test('Should call LeftJoinAndSelect with correct value if join is provided with leftJoinAndSelect', async () => {
          const { sut } = makeSut()
          sut.join = {
            alias: datatype.uuid(),
            leftJoinAndSelect: {
              [database.column()]: datatype.uuid(),
              [database.column()]: datatype.uuid(),
              [database.column()]: datatype.uuid()
            }
          }
          const leftJoinAndSelectSpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'leftJoinAndSelect')
          const request = mockListEntitiesRepositoryDTO()
          await sut.list(request)
          const leftJoinsKeys = Object.keys(sut.join?.leftJoinAndSelect)
          const leftJoinsValues = Object.values(sut.join.leftJoinAndSelect)
          leftJoinsKeys.forEach((key, index) => {
            expect(leftJoinAndSelectSpy).toHaveBeenCalledWith(leftJoinsValues[index], key)
          })
        })
      })

      describe('InnerJoin', () => {
        test('Should not call innerJoinAndSelect if join is not provided', async () => {
          const { sut } = makeSut()
          delete sut.join
          const innerJoinAndSelectSpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'innerJoinAndSelect')
          const request = mockListEntitiesRepositoryDTO()
          await sut.list(request)
          expect(innerJoinAndSelectSpy).not.toHaveBeenCalled()
        })

        test('Should not call innerJoinAndSelect if join is provided without innerJoinAndSelect', async () => {
          const { sut } = makeSut()
          sut.join = {
            alias: datatype.uuid()
          }
          const innerJoinAndSelectSpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'innerJoinAndSelect')
          const request = mockListEntitiesRepositoryDTO()
          await sut.list(request)
          expect(innerJoinAndSelectSpy).not.toHaveBeenCalled()
        })

        test('Should not call innerJoinAndSelect if join is provided with empty innerJoinAndSelect', async () => {
          const { sut } = makeSut()
          sut.join = {
            alias: datatype.uuid(),
            innerJoinAndSelect: {}
          }
          const innerJoinAndSelectSpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'innerJoinAndSelect')
          const request = mockListEntitiesRepositoryDTO()
          await sut.list(request)
          expect(innerJoinAndSelectSpy).not.toHaveBeenCalled()
        })

        test('Should call innerJoinAndSelect with correct value if join is provided with innerJoinAndSelect', async () => {
          const { sut } = makeSut()
          sut.join = {
            alias: datatype.uuid(),
            innerJoinAndSelect: {
              [database.column()]: datatype.uuid(),
              [database.column()]: datatype.uuid(),
              [database.column()]: datatype.uuid()
            }
          }
          const innerJoinAndSelectSpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'innerJoinAndSelect')
          const request = mockListEntitiesRepositoryDTO()
          await sut.list(request)
          const innerJoinsKeys = Object.keys(sut.join?.innerJoinAndSelect)
          const innerJoinsValues = Object.values(sut.join.innerJoinAndSelect)
          innerJoinsKeys.forEach((key, index) => {
            expect(innerJoinAndSelectSpy).toHaveBeenCalledWith(innerJoinsValues[index], key)
          })
        })
      })
    })

    describe('Where', () => {
      test('Should call Where with correct value if GetWhere return a value', async () => {
        const { sut } = makeSut()
        const where = datatype.uuid()
        jest.spyOn(sut, 'getWhere').mockReturnValueOnce(where)
        const whereSpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'where')
        await sut.list(mockListEntitiesRepositoryDTO())
        expect(whereSpy).toHaveBeenCalledWith(where)
      })

      test('Should call Where with correct value if GetWhere return undefined', async () => {
        const { sut } = makeSut()
        jest.spyOn(sut, 'getWhere').mockReturnValueOnce(undefined)
        const whereSpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'where')
        await sut.list(mockListEntitiesRepositoryDTO())
        expect(whereSpy).toHaveBeenCalledWith({})
      })
    })

    describe('Options', () => {
      test('Should not call WithDeleted if options returnDeletedEntities is false', async () => {
        const { sut } = makeSut()
        const withDeletedSpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'withDeleted')
        const options = mockRepositoryOptionsModel()
        options.returnDeletedEntities = false
        await sut.list(mockListEntitiesRepositoryDTO(), options)
        expect(withDeletedSpy).not.toHaveBeenCalled()
      })

      test('Should not call WithDeleted if options returnDeletedEntities is not provided', async () => {
        const { sut } = makeSut()
        const withDeletedSpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'withDeleted')
        const options = mockRepositoryOptionsModel()
        delete options.returnDeletedEntities
        await sut.list(mockListEntitiesRepositoryDTO(), options)
        expect(withDeletedSpy).not.toHaveBeenCalled()
      })

      test('Should call WithDeleted if options returnDeletedEntities is true', async () => {
        const { sut } = makeSut()
        const withDeletedSpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'withDeleted')
        const options = mockRepositoryOptionsModel()
        options.returnDeletedEntities = true
        await sut.list(mockListEntitiesRepositoryDTO(), options)
        expect(withDeletedSpy).toHaveBeenCalled()
      })
    })

    describe('Skip', () => {
      test('Should call Skip with correct value if skip is provided', async () => {
        const { sut } = makeSut()
        const request = mockListEntitiesRepositoryDTO()
        request.skip = datatype.number()
        const skipSpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'skip')
        await sut.list(request)
        expect(skipSpy).toHaveBeenCalledWith(request.skip)
      })

      test('Should call Skip with correct value if skip is not provided', async () => {
        const { sut } = makeSut()
        const request = mockListEntitiesRepositoryDTO()
        delete request.skip
        const skipSpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'skip')
        await sut.list(request)
        expect(skipSpy).toHaveBeenCalledWith(0)
      })

      test('Should call Skip with correct value if filters is not provided', async () => {
        const { sut } = makeSut()
        const skipSpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'skip')
        await sut.list(undefined)
        expect(skipSpy).toHaveBeenCalledWith(0)
      })
    })

    describe('Take', () => {
      test('Should call Take with correct value if recordsPerPage is provided', async () => {
        const { sut } = makeSut()
        const request = mockListEntitiesRepositoryDTO()
        request.recordsPerPage = datatype.number()
        const takeSpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'take')
        await sut.list(request)
        expect(takeSpy).toHaveBeenCalledWith(request.recordsPerPage)
      })

      test('Should call Take with correct value if fitlers is not provided', async () => {
        const { sut } = makeSut()
        const takeSpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'take')
        await sut.list(undefined)
        expect(takeSpy).toHaveBeenCalledWith(25)
      })

      test('Should call Take with correct value if recordsPerPage is not provided', async () => {
        const { sut } = makeSut()
        const request = mockListEntitiesRepositoryDTO()
        delete request.recordsPerPage
        const takeSpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'take')
        await sut.list(request)
        expect(takeSpy).toHaveBeenCalledWith(25)
      })
    })

    describe('GetMany', () => {
      test('Should call GetMany', async () => {
        const { sut } = makeSut()
        const getManySpy = jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'getMany')
        await sut.list(mockListEntitiesRepositoryDTO())
        expect(getManySpy).toHaveBeenCalled()
      })

      test('Should return same GetMany return', async () => {
        const { sut } = makeSut()
        const list = [
          mockEntityModel(),
          mockEntityModel(),
          mockEntityModel(),
          mockEntityModel()
        ]
        jest.spyOn(TypeOrmRepositorySpy.queryBuilder, 'getMany').mockResolvedValue(list)
        const response = await sut.list(mockListEntitiesRepositoryDTO())
        expect(response).toEqual(list)
      })
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
