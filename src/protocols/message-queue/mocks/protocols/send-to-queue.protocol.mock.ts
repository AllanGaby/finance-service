import { SendToQueueDTO, SendToQueueProtocol } from '@/protocols/message-queue'
import { datatype } from 'faker'

export class SendToQueueSpy implements SendToQueueProtocol {
  params: SendToQueueDTO<any>
  result: boolean = datatype.boolean()

  async sendToQueue <ParamsType>(params: SendToQueueDTO<ParamsType>): Promise<boolean> {
    this.params = params
    return this.result
  }
}
