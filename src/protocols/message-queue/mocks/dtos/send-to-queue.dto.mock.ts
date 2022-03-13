import { SendToQueueDTO } from '@/protocols/message-queue'
import { datatype, random } from 'faker'

export const mockSendToQueueDTO = (): SendToQueueDTO<object> => ({
  queueName: datatype.uuid(),
  params: random.objectElement<object>()
})
