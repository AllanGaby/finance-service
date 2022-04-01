import { SendMailUseCase, SendMailDTO } from '@/domain/comunication'
import { SettingsModel } from '@/domain/common'

export class SendMailUseCaseSpy implements SendMailUseCase {
  params: SendMailDTO
  authenticationSettings: SettingsModel

  async sendMail (params: SendMailDTO, authenticationSettings: SettingsModel): Promise<void> {
    this.params = params
    this.authenticationSettings = authenticationSettings
    return undefined
  }
}
