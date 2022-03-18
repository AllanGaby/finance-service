import { application } from '@/main/application/setup/application'
import {
  AccessProfileModel,
  mockAccessProfileModel
} from '@/domain/authentication'
import { InvalidForeignKeyError, ViolateUniqueKeyError } from '@/data/common/errors'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { HttpStatusCode } from '@/protocols/http'
import { datatype } from 'faker'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/access-profile/'
let currentAccessProfile: AccessProfileModel
let server: http.Server
let agent: SuperAgentTest

describe('DELETE /authentication/access-profile/:access-profile_id - Delete a AccessProfile By Id', () => {
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
    currentAccessProfile = mockAccessProfileModel()
  })

  describe('NoContent Status Code (204)', () => {
    test('Should return NoContent status code(204) if succeeds', async () => {
      await agent
        .delete(`${url}/${currentAccessProfile.id}`)
        .expect(HttpStatusCode.noContent)
    })
  })

  describe('NotFound Status Code 404', () => {
    test('Should return NotFound status code (404) if access_profile_id is not provided', async () => {
      await agent
        .delete(url)
        .expect(HttpStatusCode.notFound)
    })
  })

  describe('Conflict status code(409)', () => {
    test('Should return Conflict status code(409) if AccessProfileRepository return ViolateUniqueKeyError', async () => {
      jest.spyOn(CommonMemoryRepository.getRepository(), 'deleteById').mockRejectedValueOnce(new ViolateUniqueKeyError(datatype.uuid()))
      await agent
        .delete(`${url}/${currentAccessProfile.id}`)
        .expect(HttpStatusCode.conflict)
    })

    test('Should return Conflict status code(409) if AccessProfileRepository return InvalidForeignKeyError', async () => {
      jest.spyOn(CommonMemoryRepository.getRepository(), 'deleteById').mockRejectedValueOnce(new InvalidForeignKeyError(datatype.uuid()))
      await agent
        .delete(`${url}/${currentAccessProfile.id}`)
        .expect(HttpStatusCode.conflict)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('AccessProfileId validations', () => {
      test('Should return Unprocessable entity status code (422) if access_profile_id is not a uuid', async () => {
        const response = await agent
          .delete(`${url}/${datatype.number()}`)
          .expect(HttpStatusCode.unprocessableEntity)
        expect(response.body).toEqual({
          error: [
            { path: 'access_profile_id', message: '"access_profile_id" must be a valid GUID' }
          ]
        })
      })
    })
  })
})
