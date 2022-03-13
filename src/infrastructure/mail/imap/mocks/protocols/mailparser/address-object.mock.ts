import { AddressObject } from 'mailparser'
import { mockEmailAddress } from '@/infrastructure/mail'
import { datatype } from 'faker'

export const mockAddressObject = (): AddressObject => ({
  value: [
    mockEmailAddress(),
    mockEmailAddress(),
    mockEmailAddress(),
    mockEmailAddress()
  ],
  html: datatype.string(),
  text: datatype.string()
})
