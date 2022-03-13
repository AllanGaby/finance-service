import { internet, name } from 'faker'
import { EmailAddress } from 'mailparser'

export const mockEmailAddress = (): EmailAddress => ({
  name: name.findName(),
  address: internet.email()
})
