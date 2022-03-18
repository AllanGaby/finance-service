import { HttpHelper } from './http.helper'
import { HttpStatusCode, HttpResponse } from '@/protocols/http'
import { random } from 'faker'

describe('HttpHelper', () => {
  describe('Ok Method', () => {
    test('Should return ok status code (200) and correct body', () => {
      const body = random.objectElement<object>()
      const expectedValue: HttpResponse<object> = {
        statusCode: HttpStatusCode.ok,
        body
      }
      const response = HttpHelper.ok<object>(body)
      expect(expectedValue).toEqual(response)
    })
  })

  describe('Created Method', () => {
    test('Should return created status code (201) and correct body', () => {
      const body = random.objectElement<object>()
      const expectedValue: HttpResponse<object> = {
        statusCode: HttpStatusCode.created,
        body
      }
      const response = HttpHelper.created<object>(body)
      expect(expectedValue).toEqual(response)
    })
  })

  describe('noContent Method', () => {
    test('Should return noContent status code (204) and undefined body', () => {
      const expectedValue: HttpResponse<object> = {
        statusCode: HttpStatusCode.noContent,
        body: undefined
      }
      const response = HttpHelper.noContent()
      expect(expectedValue).toEqual(response)
    })
  })

  describe('BadRequest Method', () => {
    test('Should return badRequest status code (400) and correct body', () => {
      const error = new Error()
      const expectedValue: HttpResponse<Error> = {
        statusCode: HttpStatusCode.badRequest,
        body: error
      }
      const response = HttpHelper.badRequest(error)
      expect(expectedValue).toEqual(response)
    })
  })

  describe('Unauthorized Method', () => {
    test('Should return unauthorized status code (401) and correct body', () => {
      const error = new Error()
      const expectedValue: HttpResponse<Error> = {
        statusCode: HttpStatusCode.unauthorized,
        body: error
      }
      const response = HttpHelper.unauthorized(error)
      expect(expectedValue).toEqual(response)
    })
  })

  describe('Forbidden Method', () => {
    test('Should return forbidden status code (403) and correct body', () => {
      const error = new Error()
      const expectedValue: HttpResponse<Error> = {
        statusCode: HttpStatusCode.forbidden,
        body: error
      }
      const response = HttpHelper.forbidden(error)
      expect(expectedValue).toEqual(response)
    })
  })

  describe('NotFound Method', () => {
    test('Should return not found status code (404) and correct body if body is provided', () => {
      const body = random.objectElement<object>()
      const expectedValue: HttpResponse<object> = {
        statusCode: HttpStatusCode.notFound,
        body
      }
      const response = HttpHelper.notFound<object>(body)
      expect(expectedValue).toEqual(response)
    })

    test('Should return not found status code (404) and undefined body if body is not provided', () => {
      const expectedValue: HttpResponse<undefined> = {
        statusCode: HttpStatusCode.notFound,
        body: undefined
      }
      const response = HttpHelper.notFound()
      expect(expectedValue).toEqual(response)
    })
  })

  describe('Conflict Method', () => {
    test('Should return conflict status code (409) and correct body', () => {
      const error = new Error()
      const expectedValue: HttpResponse<Error> = {
        statusCode: HttpStatusCode.conflict,
        body: error
      }
      const response = HttpHelper.conflict(error)
      expect(expectedValue).toEqual(response)
    })
  })

  describe('UnprocessableEntity Method', () => {
    test('Should return unprocessable entity status code (422) and correct body', () => {
      const body = random.objectElement<object>()
      const expectedValue: HttpResponse<object> = {
        statusCode: HttpStatusCode.unprocessableEntity,
        body
      }
      const response = HttpHelper.unprocessableEntity(body)
      expect(expectedValue).toEqual(response)
    })
  })

  describe('ServerError Method', () => {
    test('Should return server error status code (500) and correct body', () => {
      const error = new Error()
      const expectedValue: HttpResponse<Error> = {
        statusCode: HttpStatusCode.serverError,
        body: error
      }
      const response = HttpHelper.serverError(error)
      expect(expectedValue).toEqual(response)
    })
  })
})
