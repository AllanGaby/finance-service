import { ImapAdapter } from './imap.adapter'
import { AttachmentModel, ContentType, ReadMailSpy } from '@/protocols/mail'
import { ImapConfig, mockImapConfig, ImapFetchSpy, ImapMessageSpy, mockParsedMail } from '@/infrastructure/mail'
import { datatype } from 'faker'
import mailParser from 'mailparser'

jest.mock('imap')

type sutTypes = {
  sut: ImapAdapter
  unreadMailsSince: Date
}

const makeSut = (config: ImapConfig = mockImapConfig()): sutTypes => {
  const sut = new ImapAdapter(config)
  return {
    sut,
    unreadMailsSince: datatype.datetime()
  }
}

describe('ImapAdapter', () => {
  describe('Ready Method', () => {
    test('Should call once method with correct values to exexute provided function when Imap is ready', async () => {
      const { sut, unreadMailsSince } = makeSut()
      const onceSpy = jest.spyOn(sut.imapClient, 'once')
      await sut.ready(unreadMailsSince, ReadMailSpy.onReadMail)
      expect(onceSpy).toHaveBeenCalledWith('ready', expect.any(Function))
    })
  })

  describe('OpenBox Method', () => {
    test('Should call openBox method with correct values to read inbox mails', async () => {
      const { sut, unreadMailsSince } = makeSut()
      const openBoxSpy = jest.spyOn(sut.imapClient, 'openBox')
      await sut.onOpenBox(unreadMailsSince, ReadMailSpy.onReadMail)
      expect(openBoxSpy).toHaveBeenCalledWith('INBOX', false, expect.any(Function))
    })
  })

  describe('SearchMail Method', () => {
    test('Should call search method with correct values to seach unread emails since provided date', async () => {
      const { sut, unreadMailsSince } = makeSut()
      const searchSpy = jest.spyOn(sut.imapClient, 'search')
      await sut.onSearchMail(unreadMailsSince, ReadMailSpy.onReadMail)
      expect(searchSpy).toHaveBeenCalledWith(['UNSEEN', ['SINCE', unreadMailsSince]], expect.any(Function))
    })
  })

  describe('FilterMails Method', () => {
    describe('If mailsIdList is empty list', () => {
      test('Should call End method', async () => {
        const { sut } = makeSut()
        const mailsIdList: number[] = []
        const endSpy = jest.spyOn(sut.imapClient, 'end')
        sut.onFilterMails(undefined, mailsIdList, ReadMailSpy.onReadMail)
        expect(endSpy).toHaveBeenCalled()
      })

      test('Should not call fetch method', async () => {
        const { sut } = makeSut()
        const mailsIdList: number[] = []
        const fetchSpy = jest.spyOn(sut.imapClient, 'fetch')
        sut.onFilterMails(undefined, mailsIdList, ReadMailSpy.onReadMail)
        expect(fetchSpy).not.toHaveBeenCalled()
      })
    })

    describe('If mailsIdList is a number list', () => {
      test('Should not call End method', async () => {
        const { sut } = makeSut()
        const mailsIdList: number[] = [
          datatype.number(),
          datatype.number(),
          datatype.number(),
          datatype.number()
        ]
        jest.spyOn(sut.imapClient, 'fetch').mockReturnValueOnce(new ImapFetchSpy())
        const endSpy = jest.spyOn(sut.imapClient, 'end')
        sut.onFilterMails(undefined, mailsIdList, ReadMailSpy.onReadMail)
        expect(endSpy).not.toHaveBeenCalled()
      })

      test('Should call fetch method with correct values', async () => {
        const { sut } = makeSut()
        const mailsIdList: number[] = [
          datatype.number(),
          datatype.number(),
          datatype.number(),
          datatype.number()
        ]
        jest.spyOn(sut.imapClient, 'fetch').mockReturnValueOnce(new ImapFetchSpy())
        const fetchSpy = jest.spyOn(sut.imapClient, 'fetch')
        sut.onFilterMails(undefined, mailsIdList, ReadMailSpy.onReadMail)
        expect(fetchSpy).toHaveBeenCalledWith(mailsIdList, { bodies: '' })
      })

      test('Should call message on method with correct values to fetch all returned mails', async () => {
        const { sut } = makeSut()
        const mailsIdList: number[] = [
          datatype.number(),
          datatype.number(),
          datatype.number(),
          datatype.number()
        ]
        const fetch = new ImapFetchSpy()
        jest.spyOn(sut.imapClient, 'fetch').mockReturnValueOnce(fetch)
        const onSpy = jest.spyOn(fetch, 'on')
        sut.onFilterMails(undefined, mailsIdList, ReadMailSpy.onReadMail)
        expect(onSpy).toHaveBeenCalledWith('message', expect.any(Function))
      })
    })
  })

  describe('ReadMessage Method', () => {
    test('Should call on method with correct values to read body message', async () => {
      const { sut } = makeSut()
      const imapMessage = new ImapMessageSpy()
      const onSpy = jest.spyOn(imapMessage, 'on')
      sut.onReadMessage(imapMessage, ReadMailSpy.onReadMail)
      expect(onSpy).toHaveBeenCalledWith('body', expect.any(Function))
    })

    test('Should call on method with correct values to read end message', async () => {
      const { sut } = makeSut()
      const imapMessage = new ImapMessageSpy()
      const onSpy = jest.spyOn(imapMessage, 'on')
      sut.onReadMessage(imapMessage, ReadMailSpy.onReadMail)
      expect(onSpy).toHaveBeenCalledWith('end', expect.any(Function))
    })
  })

  describe('ReadBody Method', () => {
    describe('ParseMail', () => {
      test('Should call simpleParser with correct value', async () => {
        const { sut } = makeSut()
        const mail = Buffer.from(datatype.string())
        jest.spyOn(mailParser, 'simpleParser').mockResolvedValueOnce(mockParsedMail())
        const simpleParserSpy = jest.spyOn(mailParser, 'simpleParser')
        await sut.onReadBody(mail, ReadMailSpy.onReadMail)
        expect(simpleParserSpy).toHaveBeenCalledWith(mail)
      })
    })

    describe('Call OnReadMail', () => {
      test('Should call OnReadMail with correct values if mails didnt attachments', async () => {
        const { sut } = makeSut()
        const mail = Buffer.from(datatype.string())
        const parsedMail = mockParsedMail()
        parsedMail.attachments = []
        jest.spyOn(mailParser, 'simpleParser').mockResolvedValueOnce(parsedMail)
        const onReadMailSpy = jest.spyOn(ReadMailSpy, 'onReadMail')
        await sut.onReadBody(mail, ReadMailSpy.onReadMail)
        expect(onReadMailSpy).toHaveBeenCalledWith({
          content: parsedMail.text,
          date: parsedMail.date,
          from: parsedMail.from.value.map<string>(address => address.address).join(','),
          subject: parsedMail.subject,
          attachments: []
        })
      })

      test('Should call OnReadMail with correct values if mails didnt attachments', async () => {
        const { sut } = makeSut()
        const mail = Buffer.from(datatype.string())
        const parsedMail = mockParsedMail()
        jest.spyOn(mailParser, 'simpleParser').mockResolvedValueOnce(parsedMail)
        const onReadMailSpy = jest.spyOn(ReadMailSpy, 'onReadMail')
        await sut.onReadBody(mail, ReadMailSpy.onReadMail)
        expect(onReadMailSpy).toHaveBeenCalledWith({
          content: parsedMail.text,
          date: parsedMail.date,
          from: parsedMail.from.value.map<string>(address => address.address).join(','),
          subject: parsedMail.subject,
          attachments: parsedMail.attachments.map<AttachmentModel>(attachment => ({
            contentType: attachment.contentType as ContentType,
            fileContent: Buffer.from(attachment.content),
            fileName: attachment.filename
          }))
        })
      })
    })
  })

  describe('ListenUnreadMail Method', () => {
    test('Should call Ready Method with correct value if any date is provided', async () => {
      const { sut, unreadMailsSince } = makeSut()
      const readySpy = jest.spyOn(sut, 'ready')
      await sut.listenUnreadMail(ReadMailSpy.onReadMail, unreadMailsSince)
      expect(readySpy).toHaveBeenCalledWith(unreadMailsSince, ReadMailSpy.onReadMail)
    })

    test('Should call Ready Method with correct value if any date is not provided', async () => {
      const { sut } = makeSut()
      const readySpy = jest.spyOn(sut, 'ready')
      await sut.listenUnreadMail(ReadMailSpy.onReadMail)
      expect(readySpy).toHaveBeenCalledWith(expect.any(Date), ReadMailSpy.onReadMail)
    })

    test('Should call Connect', () => {
      const { sut } = makeSut()
      const connectSpy = jest.spyOn(sut.imapClient, 'connect')
      sut.listenUnreadMail(ReadMailSpy.onReadMail)
      expect(connectSpy).toHaveBeenCalled()
    })
  })
})
