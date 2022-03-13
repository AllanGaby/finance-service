import { Excel4NodeColumnHeaderModel } from '@/infrastructure/excel/excel4node'
import { mockExcelColumnHeaderModel } from '@/protocols/excel'

export const mockExcel4NodeColumnHeaderModel = (): Excel4NodeColumnHeaderModel => ({
  ...mockExcelColumnHeaderModel(),
  style: {
    font: {
      bold: true
    }
  }
})
