export type SMTPConfig = {
  host?: string
  port?: number
  secure?: boolean
  service?: string
  auth?: {
    user: string
    pass: string
  }
}
