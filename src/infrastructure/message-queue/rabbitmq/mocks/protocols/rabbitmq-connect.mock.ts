import { RabbitMQChannelSpy } from '@/infrastructure/message-queue/rabbitmq/mocks'

export class RabbitMQConnectionSpy {
  constructor (private readonly channel: RabbitMQChannelSpy) {}

  async createChannel (): Promise<any> {
    return this.channel
  }
}
