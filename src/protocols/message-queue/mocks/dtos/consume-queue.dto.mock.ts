import { ConsumeQueueDTO, ExecuteQueueSpy } from '@/protocols/message-queue'
import { datatype } from 'faker'

export const mockConsumeQueueDTO = (): ConsumeQueueDTO => ({
  queueName: datatype.uuid(),
  executor: new ExecuteQueueSpy()
})
