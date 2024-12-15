import getTests from '@/src/services/test'
import express from 'express'
const routerTest = express.Router()

import { dataTest, dataAsk } from '@/datas/entries'

// Recupero todos los tests (GET api/tests)
routerTest.get('/tests', async (_req, res) => {
  try {
    const salida = await getTests()
    res.json(salida)
  } catch (error) {
    res.status(500).send({ message: `Error al conectar a la base de datos {${error}}` })
  }
})

routerTest.get('/test/:idTest', (_req, res) => {
  const idTest = Number(_req.params.idTest)
  const findTest = dataTest.find(test => test.idTest === idTest)
  if (!findTest) res.status(404).json({ message: 'No existe el test' })
  const findAsk = dataAsk.filter(ask => ask.test === idTest)
  res.json({ test: findTest, asks: findAsk })
})

export default routerTest