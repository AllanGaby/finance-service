import { RequestValidatorProtocol } from '@/protocols/request-validator'
import { JoiValidationAdapter } from './joi'

export class RequestValidatorFactory {
  public static getRequestValidator (): RequestValidatorProtocol {
    return new JoiValidationAdapter()
  }
}
