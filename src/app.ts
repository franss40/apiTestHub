import morgan from 'morgan'
import cors from 'cors'
import express from 'express'
import { unknownEndPoint } from '@/src/middleware/unknownEndPoint'
import routerTest from '@/src/routes/test'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use('/api', routerTest)

app.use(unknownEndPoint)

export default app
