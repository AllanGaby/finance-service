import { ImapFetch, ImapMessage } from 'imap'

export class ImapFetchSpy implements ImapFetch {
  on (event: string, listener: Function): this;
  on (event: 'message', listener: (message: ImapMessage, seqno: number) => void): this;
  on (event: 'error', listener: (error: Error) => void): this;
  on (event: any, listener: any): this {
    return undefined
  }

  once (event: string, listener: Function): this;
  once (event: 'error', listener: (error: Error) => void): this;
  once (event: any, listener: any): this {
    return undefined
  }

  addListener (eventName: string | symbol, listener: (...args: any[]) => void): this {
    return undefined
  }

  removeListener (eventName: string | symbol, listener: (...args: any[]) => void): this {
    return undefined
  }

  off (eventName: string | symbol, listener: (...args: any[]) => void): this {
    return undefined
  }

  removeAllListeners (event?: string | symbol): this {
    return undefined
  }

  setMaxListeners (n: number): this {
    return undefined
  }

  getMaxListeners (): number {
    return undefined
  }

  listeners (eventName: string | symbol): Function[] {
    return undefined
  }

  rawListeners (eventName: string | symbol): Function[] {
    return undefined
  }

  emit (eventName: string | symbol, ...args: any[]): boolean {
    return undefined
  }

  listenerCount (eventName: string | symbol): number {
    return undefined
  }

  prependListener (eventName: string | symbol, listener: (...args: any[]) => void): this {
    return undefined
  }

  prependOnceListener (eventName: string | symbol, listener: (...args: any[]) => void): this {
    return undefined
  }

  eventNames (): Array<string | symbol> {
    return undefined
  }
}
