import morgan from 'morgan'
import cors from 'cors'
import 'express-async-errors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import { unknownEndPoint } from '@/src/middleware/unknownEndPoint'
import routerTest from '@/src/routes/test'
import routerUser from '@/src/routes/user'
import { errorHandler } from '@/src/middleware/errorHandler'

const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after an hour',
})

app.use(limiter)

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api', routerTest)
app.use('/api/user', routerUser)

app.use(unknownEndPoint)
app.use(errorHandler)

export default app
