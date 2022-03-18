import { application } from '@/main/application/setup/application'
import {
  AccountModel,
  mockAccountModel
} from '@/domain/authentication'
import { InvalidForeignKeyError, ViolateUniqueKeyError } from '@/data/common/errors'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { HttpStatusCode } from '@/protocols/http'
import { datatype } from 'faker'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/account/'
let currentAccount: AccountModel
let server: http.Server
let agent: SuperAgentTest

describe('DELETE /authentication/account/:account_id - Delete a Account By Id', () => {
  beforeAll((done) => {
    server = application.listen(4000, (): void => {
      agent = supertest.agent(server)
      done()
    })
  })

  afterAll((done) => {
    server && server.close(done)
  })

  beforeEach(async () => {
    currentAccount = mockAccountModel()
  })

  describe('NoContent Status Code (204)', () => {
    test('Should return NoContent status code(204) if succeeds', async () => {
      await agent
        .delete(`${url}/${currentAccount.id}`)
        .expect(HttpStatusCode.noContent)
    })
  })

  describe('NotFound Status Code 404', () => {
    test('Should return NotFound status code (404) if account_id is not provided', async () => {
      await agent
        .delete(url)
        .expect(HttpStatusCode.notFound)
    })
  })

  describe('Conflict status code(409)', () => {
    test('Should return Conflict status code(409) if AccountRepository return ViolateUniqueKeyError', async () => {
      jest.spyOn(CommonMemoryRepository.getRepository(), 'deleteById').mockRejectedValueOnce(new ViolateUniqueKeyError(datatype.uuid()))
      await agent
        .delete(`${url}/${currentAccount.id}`)
        .expect(HttpStatusCode.conflict)
    })

    test('Should return Conflict status code(409) if AccountRepository return InvalidForeignKeyError', async () => {
      jest.spyOn(CommonMemoryRepository.getRepository(), 'deleteById').mockRejectedValueOnce(new InvalidForeignKeyError(datatype.uuid()))
      await agent
        .delete(`${url}/${currentAccount.id}`)
        .expect(HttpStatusCode.conflict)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('AccountId validations', () => {
      test('Should return Unprocessable entity status code (422) if account_id is not a uuid', async () => {
        const response = await agent
          .delete(`${url}/${datatype.number()}`)
          .expect(HttpStatusCode.unprocessableEntity)
        expect(response.body).toEqual({
          error: [
            { path: 'account_id', message: '"account_id" must be a valid GUID' }
          ]
        })
      })
    })
  })
})
