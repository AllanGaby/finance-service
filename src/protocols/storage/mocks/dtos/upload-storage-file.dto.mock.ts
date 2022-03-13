import { UploadStorageFileDTO } from '@/protocols/storage'
import { system } from 'faker'

export const mockUploadStorageFileDTO = (): UploadStorageFileDTO => ({
  source_file: system.fileName(),
  destination_file: system.fileName()
})
