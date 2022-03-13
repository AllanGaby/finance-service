import { ConsumeQueueProtocol, ConsumeQueueDTO, ExecuteQueueProtocol, SendToQueueProtocol, SendToQueueDTO } from '@/protocols/message-queue'
import { Channel, connect, ConsumeMessage } from 'amqplib'

export class RabbitMQAdapter implements ConsumeQueueProtocol, SendToQueueProtocol {
  private queueExecutor: ExecuteQueueProtocol

  constructor (
    private readonly rabbitMQHost: string
  ) {}

  private readonly getChannel = async (): Promise<Channel> => {
    const connection = await connect(this.rabbitMQHost)
    return connection.createChannel()
  }

  private readonly createQueue = async (channel: Channel, queueName: string): Promise<any> => {
    return new Promise((resolve: any, reject: any) => {
      try {
        channel.assertQueue(queueName, { durable: true })
        resolve(channel)
      } catch (error) {
        reject(error)
      }
    })
  }

  async sendToQueue<ParamsType = any>({ queueName, params }: SendToQueueDTO<ParamsType>): Promise<boolean> {
    const channel = await this.getChannel()
    await this.createQueue(channel, queueName)
    return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(params)))
  }

  executeQueue (paramsRabbitMQ: ConsumeMessage): void {
    const params = JSON.parse(paramsRabbitMQ.content.toString())
    this.queueExecutor.execute(params)
  }

  async consume ({ queueName, executor }: ConsumeQueueDTO): Promise<any> {
    const channel = await this.getChannel()
    await this.createQueue(channel, queueName)
    this.queueExecutor = executor
    /* istanbul ignore next */
    channel.consume(queueName, (paramsRabbitMQ: ConsumeMessage) => this.executeQueue(paramsRabbitMQ), { noAck: true })
  }
}
