import { SendToQueueDTO } from '@/protocols/message-queue'

export interface SendToQueueProtocol {
  sendToQueue: <ParamsType>(params: SendToQueueDTO<ParamsType>) => Promise<boolean>
}
