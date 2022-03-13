import { FileContentModel, ReadFileContentByBufferProtocol } from '@/protocols/excel'
import XLSX from 'xlsx'

export class XlsxAdapter
implements ReadFileContentByBufferProtocol {
  getContentByBuffer (content: Buffer): FileContentModel {
    const workBook = XLSX.read(content)
    if (!workBook) {
      return undefined
    }
    const resultContent: FileContentModel = {}
    workBook.SheetNames.forEach(sheetName => {
      const sheet = workBook.Sheets[sheetName]
      const sheetContent = XLSX.utils.sheet_to_json(sheet, { blankrows: false, defval: '' })
      resultContent[sheetName] = sheetContent.map(item => Object.values(item))
    })
    return resultContent
  }
}
