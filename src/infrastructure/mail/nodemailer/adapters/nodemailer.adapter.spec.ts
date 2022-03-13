import { NodemailerAdapter } from './nodemailer.adapter'
import { SendMailDTO, mockSendMailDTO, SMTPConfig, mockSMTPConfig } from '@/protocols/mail'
import { NodemailerTransportSpy } from '@/infrastructure/mail/nodemailer/mocks'

jest.mock('nodemailer', () => ({
  createTransport: () => {
    return NodemailerTransportSpy
  }
}))

type sutTypes = {
  sut: NodemailerAdapter
  sendMailDTO: SendMailDTO
  smtpConfig: SMTPConfig
}

const makeSut = (): sutTypes => ({
  sut: new NodemailerAdapter(),
  sendMailDTO: mockSendMailDTO(),
  smtpConfig: mockSMTPConfig()
})

describe('NodemailerAdapter', () => {
  test('Should call sendMail to nodemailer with correct value', async () => {
    const { sut, smtpConfig, sendMailDTO } = makeSut()
    const sendMailSpy = jest.spyOn(NodemailerTransportSpy, 'sendMail')
    await sut.sendMail(smtpConfig, sendMailDTO)
    expect(sendMailSpy).toHaveBeenCalledWith({
      sender: {
        address: sendMailDTO.sender.email,
        name: sendMailDTO.sender.name
      },
      subject: sendMailDTO.subject,
      to: {
        address: sendMailDTO.to.email,
        name: sendMailDTO.to.name
      },
      html: sendMailDTO.content
    })
  })
})
