import express from 'express'
import { MiddlewaresSetup, RoutesSetup, SwaggerSetup } from '@/main/application/setup/express'
import { SeedsSetup } from '@/main/application/setup'

const application = express()
SwaggerSetup(application)
MiddlewaresSetup(application)
RoutesSetup(application)
SeedsSetup()
export default application
