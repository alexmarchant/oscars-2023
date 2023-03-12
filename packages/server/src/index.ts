import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import morgan from 'morgan'
import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import { appRouter } from './trpc/router'
import { createContext } from './trpc/context'

const app = express()
const port = 3000

app.use(cors())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('OK')
})

app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
    onError({ error, type, path, input, ctx, req }) {
      console.error('Error:', error.message)
    },
  }),
)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})