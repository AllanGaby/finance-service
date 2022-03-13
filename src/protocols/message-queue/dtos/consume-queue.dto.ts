import { ExecuteQueueProtocol } from '@/protocols/message-queue'

export type ConsumeQueueDTO = {
  queueName: string
  executor: ExecuteQueueProtocol
}
