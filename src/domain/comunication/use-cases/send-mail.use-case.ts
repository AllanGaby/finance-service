import { SendMailDTO } from '@/domain/comunication'
import { SettingsModel } from '@/domain/common'

export interface SendMailUseCase {
  sendMail: (params: SendMailDTO, authenticationSettings: SettingsModel) => Promise<void>
}
