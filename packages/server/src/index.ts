import * as express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import * as cors from 'cors'
import { appRouter } from './trpc/router'
import { createContext } from './trpc/context'

const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
  res.send('OK')
})

app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})