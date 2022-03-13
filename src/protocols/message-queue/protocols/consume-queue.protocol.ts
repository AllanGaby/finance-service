import { ConsumeQueueDTO } from '@/protocols/message-queue'

export interface ConsumeQueueProtocol {
  consume: (params: ConsumeQueueDTO) => Promise<void>
}
