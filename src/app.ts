import morgan from 'morgan'
import cors from 'cors'
import 'express-async-errors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import { unknownEndPoint } from '@src/middleware/unknownEndPoint'
import routerTest from '@src/routes/test'
import routerUser from '@src/routes/user'
import routerAsk from '@src/routes/ask'
import { errorHandler } from '@src/middleware/errorHandler'
import routerAdmin from './routes/admin'

const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Demasiados intentos desde esta IP, por favor intenta de nuevo después de 15 minutos',
})

app.use(limiter)

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api/test', routerTest)
app.use('/api/ask', routerAsk)
app.use('/api/user', routerUser)
app.use('/api/admin', routerAdmin)

app.use(unknownEndPoint)
app.use(errorHandler)

export default app
