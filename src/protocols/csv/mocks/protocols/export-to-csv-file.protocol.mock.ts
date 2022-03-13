import { ExportToCSVFileProtocol, ExportToCSVFileDTO } from '@/protocols/csv'
import { datatype } from 'faker'

export class ExportToCSVFileProtocolSpy implements ExportToCSVFileProtocol {
  params: ExportToCSVFileDTO<any>
  fileContent: Buffer = Buffer.from(datatype.string())

  async exportToCSV <DataType = object>(params: ExportToCSVFileDTO<DataType>): Promise<ArrayBuffer> {
    this.params = params
    return this.fileContent
  }
}
