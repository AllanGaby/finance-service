import { ConsumeQueueProtocol, SendToQueueProtocol } from '@/protocols/message-queue'
import { RabbitMQAdapter } from './rabbitmq'

export type MessageQueueProtocols =
ConsumeQueueProtocol
| SendToQueueProtocol

export class MessageQueueFactory {
  public static getCSVAdapter (messageQueueHost: string): MessageQueueProtocols {
    return new RabbitMQAdapter(messageQueueHost)
  }
}
