import { UploadFileUseCase } from '@/domain/common'

export class UploadFileUseCaseSpy<UploadFileDTO> implements UploadFileUseCase<UploadFileDTO> {
  params: any

  async upload (params: UploadFileDTO): Promise<void> {
    this.params = params
    return undefined
  }
}
