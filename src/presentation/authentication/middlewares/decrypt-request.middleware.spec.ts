import { DecryptRequestMiddleware } from './decrypt-request.middleware'
import { CreateEntityDTO, EntityModel, mockEntityModel } from '@/domain/common'
import { InvalidCredentialsError } from '@/data/authentication/errors'
import { DecryptRequestWithPrivateKeySpy } from '@/protocols/rsa'
import { mockRequest } from '@/presentation/common'
import { HttpHelper, HttpRequest } from '@/protocols/http'
import { database, datatype } from 'faker'

type sutTypes = {
  sut: DecryptRequestMiddleware
  request: HttpRequest<CreateEntityDTO<EntityModel>>
  decryptRequestWithPrivateKey: DecryptRequestWithPrivateKeySpy
  fieldName: string
  token: string
}

const makeSut = (): sutTypes => {
  const decryptRequestWithPrivateKey = new DecryptRequestWithPrivateKeySpy()
  const fieldName = database.column()
  const token = datatype.uuid()
  const request = mockRequest<EntityModel>(mockEntityModel())
  request.body[fieldName] = token
  const sut = new DecryptRequestMiddleware(decryptRequestWithPrivateKey, fieldName)
  return {
    sut,
    request,
    decryptRequestWithPrivateKey,
    fieldName,
    token
  }
}

describe('DecryptRequestMiddleware', () => {
  test('Should call DecryptRequestWithPrivateKey with correct value', async () => {
    const { sut, request, fieldName, decryptRequestWithPrivateKey } = makeSut()
    const decryptSpy = jest.spyOn(decryptRequestWithPrivateKey, 'decrypt')
    await sut.handle(request)
    expect(decryptSpy).toHaveBeenCalledWith(request.body[fieldName])
  })

  test('Should return unauthorized if DecryptRequestWithPrivateKey fails', async () => {
    const { sut, request, decryptRequestWithPrivateKey } = makeSut()
    jest.spyOn(decryptRequestWithPrivateKey, 'decrypt').mockImplementation(() => { throw new Error() })
    const response = await sut.handle(request)
    expect(response).toEqual(HttpHelper.unauthorized(new InvalidCredentialsError()))
  })

  test('Should return ok with correct value if DecryptRequestWithPrivateKey successed', async () => {
    const { sut, request, decryptRequestWithPrivateKey } = makeSut()
    const entity = JSON.stringify(mockEntityModel())
    jest.spyOn(decryptRequestWithPrivateKey, 'decrypt').mockReturnValue(entity)
    const response = await sut.handle(request)
    expect(response).toEqual(HttpHelper.ok({
      ...request.body,
      ...JSON.parse(entity)
    }, request.headers, request.queryParams, request.params))
  })
})
