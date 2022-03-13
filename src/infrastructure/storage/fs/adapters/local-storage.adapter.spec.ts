import { LocalStorageAdapter } from './local-storage.adapter'
import { mockUploadStorageFileDTO } from '@/protocols/storage'
import { LocalStorageConfig, mockLocalStorageConfig } from '@/infrastructure/storage/fs'
import { random, system } from 'faker'
import path from 'path'
import fs from 'fs'

type sutTypes = {
  sut: LocalStorageAdapter
  config: LocalStorageConfig
}

const makeSut = (): sutTypes => {
  const config = mockLocalStorageConfig()
  return {
    sut: new LocalStorageAdapter(config),
    config
  }
}

describe('LocalStorageAdapter', () => {
  describe('Exists Method', () => {
    test('Should complete filePath with uploadDir', async () => {
      const { sut, config } = makeSut()
      const fileName = system.fileName()
      const resolveSpy = jest.spyOn(path, 'resolve')
      await sut.exists(fileName)
      expect(resolveSpy).toHaveBeenCalledWith(config.uploadDir, fileName)
    })

    test('Should call fs.promises.stat with correct value', async () => {
      const { sut } = makeSut()
      const sourceFilePath = system.filePath()
      const statSpy = jest.spyOn(fs.promises, 'stat')
      jest.spyOn(path, 'resolve').mockReturnValue(sourceFilePath)
      await sut.exists(system.fileName())
      expect(statSpy).toHaveBeenCalledWith(sourceFilePath)
    })

    test('Should return false if fs.promises.stat fails', async () => {
      const { sut } = makeSut()
      jest.spyOn(fs.promises, 'stat').mockRejectedValue(new Error())
      const exists = await sut.exists(system.fileName())
      expect(exists).toBeFalsy()
    })

    test('Should return true if fs.promises.stat succeeds', async () => {
      const { sut } = makeSut()
      jest.spyOn(fs.promises, 'stat').mockResolvedValue(undefined)
      const exists = await sut.exists(system.fileName())
      expect(exists).toBeTruthy()
    })
  })

  describe('Upload Method', () => {
    beforeEach(() => {
      jest.spyOn(fs.promises, 'rename').mockResolvedValue(undefined)
    })

    test('Should complete sourceFilePath with temporaryDir', async () => {
      const { sut, config } = makeSut()
      const uploadDTO = mockUploadStorageFileDTO()
      const resolveSpy = jest.spyOn(path, 'resolve')
      await sut.upload(uploadDTO)
      expect(resolveSpy).toHaveBeenCalledWith(config.temporaryDir, uploadDTO.source_file)
    })

    test('Should complete destinationFilePath with uploadDir', async () => {
      const { sut, config } = makeSut()
      const uploadDTO = mockUploadStorageFileDTO()
      const resolveSpy = jest.spyOn(path, 'resolve')
      await sut.upload(uploadDTO)
      expect(resolveSpy).toHaveBeenCalledWith(config.uploadDir, uploadDTO.destination_file)
    })

    test('Should call fs.promise.rename with correct value', async () => {
      const { sut } = makeSut()
      const sourceFilePath = system.filePath()
      const destinationFilePath = system.filePath()
      jest.spyOn(path, 'resolve').mockReturnValueOnce(sourceFilePath).mockReturnValueOnce(destinationFilePath)
      const renameSpy = jest.spyOn(fs.promises, 'rename')
      await sut.upload(mockUploadStorageFileDTO())
      expect(renameSpy).toHaveBeenCalledWith(sourceFilePath, destinationFilePath)
    })

    test('Should return true if fs.promise.rename succeeds', async () => {
      const { sut } = makeSut()
      const upload = await sut.upload(mockUploadStorageFileDTO())
      expect(upload).toBeTruthy()
    })

    test('Should return false if fs.promise.rename fails', async () => {
      const { sut } = makeSut()
      jest.spyOn(fs.promises, 'rename').mockRejectedValue(new Error())
      const result = await sut.upload(mockUploadStorageFileDTO())
      expect(result).toBeFalsy()
    })
  })

  describe('Delete Method', () => {
    beforeEach(() => {
      jest.spyOn(fs.promises, 'unlink').mockResolvedValue(undefined)
    })

    test('Should call exists with correct value', async () => {
      const { sut } = makeSut()
      const fileName = system.fileName()
      const existsSpy = jest.spyOn(sut, 'exists')
      await sut.delete(fileName)
      expect(existsSpy).toHaveBeenCalledWith(fileName)
    })

    test('Should return false if exists return false', async () => {
      const { sut } = makeSut()
      jest.spyOn(sut, 'exists').mockResolvedValue(false)
      const result = await sut.delete(system.fileName())
      expect(result).toBeFalsy()
    })

    describe('If Exists return false', () => {
      test('Should not call path.resolve', async () => {
        const { sut, config } = makeSut()
        jest.spyOn(sut, 'exists').mockResolvedValue(false)
        const resolveSpy = jest.spyOn(path, 'resolve')
        const fileName = system.fileName()
        await sut.delete(fileName)
        expect(resolveSpy).not.toHaveBeenCalledWith(config.uploadDir, fileName)
      })
    })

    describe('If Exists return true', () => {
      test('Should call path.resolve with correct values', async () => {
        const { sut, config } = makeSut()
        jest.spyOn(sut, 'exists').mockResolvedValue(true)
        const resolveSpy = jest.spyOn(path, 'resolve')
        const fileName = system.fileName()
        await sut.delete(fileName)
        expect(resolveSpy).toHaveBeenCalledWith(config.uploadDir, fileName)
      })

      test('Should call fs.promise.unlink with correct values', async () => {
        const { sut } = makeSut()
        jest.spyOn(sut, 'exists').mockResolvedValue(true)
        const sourceFilePath = system.filePath()
        jest.spyOn(path, 'resolve').mockReturnValue(sourceFilePath)
        const unlinkSpy = jest.spyOn(fs.promises, 'unlink')
        await sut.delete(system.fileName())
        expect(unlinkSpy).toHaveBeenCalledWith(sourceFilePath)
      })

      test('Should return true if fs.promise.unlink succeeds', async () => {
        const { sut } = makeSut()
        jest.spyOn(sut, 'exists').mockResolvedValue(true)
        const sourceFilePath = system.filePath()
        jest.spyOn(path, 'resolve').mockReturnValue(sourceFilePath)
        jest.spyOn(fs.promises, 'unlink').mockResolvedValue(undefined)
        const result = await sut.delete(system.fileName())
        expect(result).toBeTruthy()
      })

      test('Should return false if fs.promise.unlink fails', async () => {
        const { sut } = makeSut()
        jest.spyOn(sut, 'exists').mockResolvedValue(true)
        const sourceFilePath = system.filePath()
        jest.spyOn(path, 'resolve').mockReturnValue(sourceFilePath)
        jest.spyOn(fs.promises, 'unlink').mockRejectedValue(new Error())
        const result = await sut.delete(system.fileName())
        expect(result).toBeFalsy()
      })
    })
  })

  describe('Get Method', () => {
    beforeEach(() => {
      jest.spyOn(fs.promises, 'readFile').mockResolvedValue(undefined)
    })

    test('Should complete filePath with uploadDir', async () => {
      const { sut, config } = makeSut()
      const fileName = system.fileName()
      const resolveSpy = jest.spyOn(path, 'resolve')
      await sut.get(fileName)
      expect(resolveSpy).toHaveBeenCalledWith(config.uploadDir, fileName)
    })

    test('Should call fs.promises.readFile with correct value', async () => {
      const { sut } = makeSut()
      const sourceFilePath = system.filePath()
      const readFileSpy = jest.spyOn(fs.promises, 'readFile')
      jest.spyOn(path, 'resolve').mockReturnValue(sourceFilePath)
      await sut.get(system.fileName())
      expect(readFileSpy).toHaveBeenCalledWith(sourceFilePath)
    })

    test('Should return same fs.promises.readFile if succeeds', async () => {
      const { sut } = makeSut()
      const fileContent = Buffer.from(random.words())
      jest.spyOn(fs.promises, 'readFile').mockResolvedValue(fileContent)
      const result = await sut.get(system.fileName())
      expect(result).toEqual(fileContent)
    })

    test('Should return undefined if fs.promises.readFile fails', async () => {
      const { sut } = makeSut()
      jest.spyOn(fs.promises, 'readFile').mockRejectedValue(new Error())
      const result = await sut.get(system.fileName())
      expect(result).toBeFalsy()
    })
  })
})
