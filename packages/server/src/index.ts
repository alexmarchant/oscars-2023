import * as express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter, createContext } from './trpc/index'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})