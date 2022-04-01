import { DeleteAccessSessionController } from './delete-access-session.controller'
import { DeleteAccessSessionUseCaseSpy } from '@/domain/authentication'
import { HttpHelper, HttpRequest } from '@/protocols/http'
import { AccessSessionHeaderRequest, mockAccessSessionHeaderRequest } from '@/presentation/authentication'

type sutTypes = {
  sut: DeleteAccessSessionController
  deleteAccessSessionUseCase: DeleteAccessSessionUseCaseSpy
  request: HttpRequest<any, AccessSessionHeaderRequest>
}

const makeSut = (): sutTypes => {
  const deleteAccessSessionUseCase = new DeleteAccessSessionUseCaseSpy()
  const sut = new DeleteAccessSessionController(deleteAccessSessionUseCase)
  return {
    sut,
    request: mockAccessSessionHeaderRequest(),
    deleteAccessSessionUseCase
  }
}

describe('DeleteAccessSessionController', () => {
  test('Should call DeleteAccessSessionUseCase with correct value', async () => {
    const { sut, deleteAccessSessionUseCase, request } = makeSut()
    const deleteSpy = jest.spyOn(deleteAccessSessionUseCase, 'delete')
    await sut.handle(request)
    expect(deleteSpy).toHaveBeenCalledWith(request.headers.access_session)
  })

  test('Should fails if DeleteAccessSessionUseCase fails', async () => {
    const { sut, deleteAccessSessionUseCase, request } = makeSut()
    jest.spyOn(deleteAccessSessionUseCase, 'delete').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.handle(request)
    await expect(promise).rejects.toThrow()
  })

  test('Should return noContent if DeleteAccessSessionUseCase is succeeds', async () => {
    const { sut, request } = makeSut()
    const response = await sut.handle(request)
    expect(response).toEqual(HttpHelper.noContent())
  })
})
