import { ConsumeMessage } from 'amqplib'

export class RabbitMQChannelSpy {
  queueName: string
  options: any
  onMessage: (msg: ConsumeMessage | null) => void

  async assertQueue (queueName: string, options: any): Promise<any> {
    this.queueName = queueName
    this.options = options
  }

  async sendToQueue (queueName: string, options: any): Promise<any> {
    this.queueName = queueName
    this.options = options
  }

  async consume (queueName: string, onMessage: (msg: ConsumeMessage | null) => void): Promise<any> {
    this.queueName = queueName
    this.onMessage = onMessage
  }
}
