import {
  UploadFileToStorageProtocol,
  UploadStorageFileDTO,
  DeleteFileInStorageProtocol,
  FileExistsInStorageProtocol,
  GetFileInStorageProtocol
} from '@/protocols/storage'
import { LocalStorageConfig } from '@/infrastructure/storage/fs'
import fs from 'fs'
import path from 'path'

export class LocalStorageAdapter implements FileExistsInStorageProtocol, UploadFileToStorageProtocol, DeleteFileInStorageProtocol, GetFileInStorageProtocol {
  constructor (private readonly config: LocalStorageConfig) {}

  async exists (fileName: string): Promise<boolean> {
    try {
      const sourceFilePath = path.resolve(this.config.uploadDir, fileName)
      await fs.promises.stat(sourceFilePath)
      return true
    } catch (_) {
      return false
    }
  }

  async upload ({ source_file: sourceFile, destination_file: destinationFile }: UploadStorageFileDTO): Promise<boolean> {
    const sourceFilePath = path.resolve(this.config.temporaryDir, sourceFile)
    const destinationFilePath = path.resolve(this.config.uploadDir, destinationFile)
    try {
      await fs.promises.rename(sourceFilePath, destinationFilePath)
      return true
    } catch {
      return false
    }
  }

  async delete (fileName: string): Promise<boolean> {
    const fileAlreadyExits = await this.exists(fileName)
    if (fileAlreadyExits) {
      const sourceFilePath = path.resolve(this.config.uploadDir, fileName)
      try {
        await fs.promises.unlink(sourceFilePath)
        return true
      } catch {
        return false
      }
    }
    return false
  }

  async get (fileName: string): Promise<Buffer> {
    const sourceFilePath = path.resolve(this.config.uploadDir, fileName)
    try {
      const fileContent = await fs.promises.readFile(sourceFilePath)
      return fileContent
    } catch {
      return undefined
    }
  }
}
