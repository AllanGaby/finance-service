import { EJSAdapter } from './ejs.adapter'
import { mockHtmlTemplateDTO } from '@/protocols/html-template'
import EJS from 'ejs'
import faker from 'faker'
import fs from 'fs'

type sutTypes = {
  sut: EJSAdapter
}

const fileContent = faker.datatype.uuid()

const makeSut = (): sutTypes => ({
  sut: new EJSAdapter()
})

describe('EJSAdapter', () => {
  beforeEach(() => {
    jest.spyOn(fs.promises, 'readFile').mockImplementationOnce(async (): Promise<string> => { return fileContent })
  })

  test('Should read correct file', async () => {
    const { sut } = makeSut()
    const readFileSpy = jest.spyOn(fs.promises, 'readFile')
    const request = mockHtmlTemplateDTO()
    await sut.parse(request)
    expect(readFileSpy).toHaveBeenCalledWith(request.filePath, {
      encoding: 'utf-8'
    })
  })

  test('Should call EJS render with correct value', async () => {
    const { sut } = makeSut()
    const renderSpy = jest.spyOn(EJS, 'render')
    const request = mockHtmlTemplateDTO()
    await sut.parse(request)
    expect(renderSpy).toHaveBeenCalledWith(fileContent, request.variables)
  })

  test('Should return same EJS render returns if succeeds', async () => {
    const { sut } = makeSut()
    const renderedHtml = faker.random.words()
    jest.spyOn(EJS, 'render').mockImplementationOnce(() => { return renderedHtml })
    const result = await sut.parse(mockHtmlTemplateDTO())
    expect(result).toBe(renderedHtml)
  })
})
