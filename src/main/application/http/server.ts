import 'module-alias/register'
import { ConfigSetup } from '@/main/application/config'
import { application } from '@/main/application/setup'

const config = ConfigSetup()
application.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`)
})
