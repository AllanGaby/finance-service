export class ExpressResponseSpy {
  status (_: number): ExpressResponseSpy {
    return this
  }

  json (_: any): ExpressResponseSpy {
    return this
  }

  contentType (_: any): ExpressResponseSpy {
    return this
  }

  writeHead (_: any): ExpressResponseSpy {
    return this
  }

  setHeader (name: string, value: string): ExpressResponseSpy {
    return this
  }

  end (_: any): void {
    return undefined
  }
}
