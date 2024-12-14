import test from '@/src/services/test'
import express from 'express'
const routerTest = express.Router()

import { dataTest, dataAsk } from '@/datas/entries'

routerTest.get('/', async (_req, res) => {
  try {
    const salida = await test()
    res.json(salida)
  } catch (error) {
    res.status(500).send({ message: `Error al conectar a la base de datos {${error}}` })
  }
})

routerTest.get('/tests', (_req, res) => {
  res.json(dataTest)
})

routerTest.get('/test/:idTest', (_req, res) => {
  const idTest = Number(_req.params.idTest)
  const findTest = dataTest.find(test => test.idTest === idTest)
  if (!findTest) res.status(404).json({ message: 'No existe el test' })
  const findAsk = dataAsk.filter(ask => ask.test === idTest)
  res.json({ test: findTest, asks: findAsk })
})

export default routerTest