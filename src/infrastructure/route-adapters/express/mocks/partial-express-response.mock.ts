import { Response } from 'express'
import { ExpressResponseSpy } from '@/infrastructure/route-adapters/express/mocks'

export const mockPartialExpressResponse = (): Partial<Response> => new ExpressResponseSpy() as Partial<Response>
