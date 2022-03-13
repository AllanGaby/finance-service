export class ExpressResponseSpy {
  status (_: number): ExpressResponseSpy {
    return this
  }

  json (_: any): ExpressResponseSpy {
    return this
  }
}
