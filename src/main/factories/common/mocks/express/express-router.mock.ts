import { Router } from 'express'

export class ExpressRouterSpy implements Partial<Router> {
  post (route: string, callback: any): any {
    return undefined
  }

  delete (route: string, callback: any): any {
    return undefined
  }

  get (route: string, callback: any): any {
    return undefined
  }

  put (route: string, callback: any): any {
    return undefined
  }

  patch (route: string, callback: any): any {
    return undefined
  }
}
