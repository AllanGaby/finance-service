import {
  CreateJsonWebTokenProtocol,
  ParseJsonWebTokenProtocol
} from '@/protocols/jwt'
import { JWTAdapter } from './jsonwebtoken'

export type JWTProtocols =
CreateJsonWebTokenProtocol &
ParseJsonWebTokenProtocol

export class JWTFactory {
  public static GetJWTAdapter<AdapterType extends JWTProtocols>(secret: string): AdapterType {
    return new JWTAdapter(secret) as unknown as AdapterType
  }
}
