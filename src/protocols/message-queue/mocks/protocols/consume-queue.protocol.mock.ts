import { ConsumeQueueProtocol, ConsumeQueueDTO } from '@/protocols/message-queue'

export class ConsumeQueueSpy implements ConsumeQueueProtocol {
  params: ConsumeQueueDTO

  async consume (params: ConsumeQueueDTO): Promise<void> {
    this.params = params
  }
}
