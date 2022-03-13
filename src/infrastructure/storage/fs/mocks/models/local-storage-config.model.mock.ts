import { LocalStorageConfig } from '@/infrastructure/storage/fs'
import { system } from 'faker'

export const mockLocalStorageConfig = (): LocalStorageConfig => ({
  temporaryDir: system.directoryPath(),
  uploadDir: system.directoryPath()
})
