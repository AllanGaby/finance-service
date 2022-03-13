import { ConsumeMessage } from 'amqplib'
import { datatype } from 'faker'

export const mockConsumeMessage = (): ConsumeMessage => ({
  content: Buffer.from(JSON.stringify({
    id: datatype.uuid()
  })),
  fields: undefined,
  properties: undefined
})
