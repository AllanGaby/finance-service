import { RequestValidatorProtocol, FieldValidationModel, RequestValidatorModel } from '@/protocols/request-validator'
import { JoiObjectSchemaMapper } from '@/infrastructure/request-validator/joi'

export class JoiValidationAdapter implements RequestValidatorProtocol {
  validate (fields: FieldValidationModel[], data: any): RequestValidatorModel[] {
    const listError = JoiObjectSchemaMapper.getSchema(fields).validate(data, {
      abortEarly: false,
      allowUnknown: true
    }).error
    if (listError) {
      const requestResult: RequestValidatorModel[] = []
      listError.details.forEach(error => {
        requestResult.push({
          path: error.path.toString(),
          message: error.message
        })
      })
      return requestResult
    }
    return undefined
  }
}
