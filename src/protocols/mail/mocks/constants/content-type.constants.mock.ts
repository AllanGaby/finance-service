import { ContentType } from '@/protocols/mail'
import { random } from 'faker'

export const mockContentType = (): ContentType =>
  random.arrayElement<ContentType>(Object.values(ContentType))
