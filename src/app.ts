import morgan from 'morgan'
import cors from 'cors'
import 'express-async-errors'
import express from 'express'
import { unknownEndPoint } from '@/src/middleware/unknownEndPoint'
import routerTest from '@/src/routes/test'
import routerUser from '@/src/routes/user'
import { errorHandler } from '@/src/middleware/errorHandler'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api', routerTest)
app.use('/api/user', routerUser)

app.use(unknownEndPoint)
app.use(errorHandler)

export default app
