import { ExecuteQueueProtocol } from '@/protocols/message-queue'

export class ExecuteQueueSpy implements ExecuteQueueProtocol {
  params: any

  async execute (params: any): Promise<void> {
    this.params = params
  }
}
