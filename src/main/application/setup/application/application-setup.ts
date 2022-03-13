import express from 'express'
import { MiddlewaresSetup, RoutesSetup } from '@/main/application/setup/express'
import { SeedsSetup } from '@/main/application/setup'

const application = express()
MiddlewaresSetup(application)
RoutesSetup(application)
SeedsSetup()
export default application
