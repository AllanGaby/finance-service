import { EntityColumnsToExportXLSXFileDTO, ExportEntitiesToFileUseCase } from '@/domain/common'
import { MemoryExportEntitiesToXLSXFileUseCase } from '@/data/common/use-cases'
import { ExcelFactory } from '@/infrastructure/excel'

export type ExportEntitiesToXLSXFileUseCaseProps = {
  validColumnsToExport: EntityColumnsToExportXLSXFileDTO
  logoFilePath: string
  entityName: string
}

export const makeExportEntitiesToXLSXFileUseCase = <EntitType>({
  validColumnsToExport,
  logoFilePath,
  entityName
}: ExportEntitiesToXLSXFileUseCaseProps): ExportEntitiesToFileUseCase<EntitType> =>
    new MemoryExportEntitiesToXLSXFileUseCase(
      validColumnsToExport,
      ExcelFactory.GetExcelWriteAdapter(),
      logoFilePath,
      entityName
    )
