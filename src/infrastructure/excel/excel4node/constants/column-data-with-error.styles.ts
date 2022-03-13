import { Style } from 'excel4node'

export const ColumnDataWithErrorStyles: Style = {
  font: {
    bold: true,
    color: 'FFFFFF'
  },
  fill: {
    type: 'pattern',
    patternType: 'solid',
    bgColor: '#DC3545',
    fgColor: '#DC3545'
  }
}
