import { ContactModel } from '@/protocols/mail'
import { internet, name as FakerName } from 'faker'

export const mockContactModel = (): ContactModel => ({
  name: FakerName.findName(),
  email: internet.email()
})
