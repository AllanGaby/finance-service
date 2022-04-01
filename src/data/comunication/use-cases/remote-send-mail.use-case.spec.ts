import { RemoteSendMailUseCase } from './remote-send-mail.use-case'
import { mockSettingsModel, SettingsModel } from '@/domain/common'
import { mockSendMailDTO, SendMailDTO } from '@/domain/comunication'
import { HtmlTemplateParseProtocolSpy } from '@/protocols/html-template'
import { SendMailProtocolSpy } from '@/protocols/mail'
import { datatype } from 'faker'

type sutTypes = {
  sut: RemoteSendMailUseCase
  settings: SettingsModel
  sendMailDTO: SendMailDTO
  htmlTemplateParseAdapter: HtmlTemplateParseProtocolSpy
  sendMailAdapter: SendMailProtocolSpy
}

const makeSut = (): sutTypes => {
  const htmlTemplateParseAdapter = new HtmlTemplateParseProtocolSpy()
  const sendMailAdapter = new SendMailProtocolSpy()
  const sut = new RemoteSendMailUseCase(
    htmlTemplateParseAdapter,
    sendMailAdapter
  )
  return {
    sut,
    sendMailDTO: mockSendMailDTO(),
    settings: mockSettingsModel(),
    htmlTemplateParseAdapter,
    sendMailAdapter
  }
}

describe('RemoteSendMailUseCase', () => {
  describe('Parse mail file', () => {
    test('Should call htmlTemplateParseAdapter with correct values', async () => {
      const { sut, sendMailDTO, settings, htmlTemplateParseAdapter } = makeSut()
      const parseSpy = jest.spyOn(htmlTemplateParseAdapter, 'parse')
      await sut.sendMail(sendMailDTO, settings)
      expect(parseSpy).toHaveBeenCalledWith({
        filePath: sendMailDTO.mailFilePath,
        variables: sendMailDTO.variables
      })
    })
  })

  describe('Send Mail', () => {
    test('Should call sendMailAdapter with correct values', async () => {
      const { sut, sendMailDTO, settings, htmlTemplateParseAdapter, sendMailAdapter } = makeSut()
      const contentMail = datatype.string()
      jest.spyOn(htmlTemplateParseAdapter, 'parse').mockResolvedValue(contentMail)
      const sendMailSpy = jest.spyOn(sendMailAdapter, 'sendMail')
      await sut.sendMail(sendMailDTO, settings)
      const { sendMailTo, subject } = sendMailDTO
      expect(sendMailSpy).toHaveBeenCalledWith({
        service: settings.smtp_service,
        auth: {
          user: settings.smtp_auth_account,
          pass: settings.smtp_auth_password
        }
      }, {
        content: contentMail,
        to: sendMailTo,
        subject,
        sender: {
          name: settings.smtp_sender_name,
          email: settings.smtp_sender_email
        }
      })
    })
  })
})
