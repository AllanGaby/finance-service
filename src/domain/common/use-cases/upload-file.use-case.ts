export interface UploadFileUseCase<UploadFileDTO> {
  upload: (params: UploadFileDTO) => Promise<void>
}
