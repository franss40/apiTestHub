import getTests from '@src/services/test'
import getAsks from '@src/services/ask'
import express from 'express'

const routerTest = express.Router()

// Recuperar todos la info de los tests junto al nombre de usuario (GET api/tests)
routerTest.get('/tests', async (_req, res) => {
  const tests = await getTests()
  res.json(tests)
})

// Recuperar los test junto nombre de usuario (GET api/test/:idTest)
routerTest.get('/test/:idTest', async (_req, res) => {
  const idTest = Number(_req.params.idTest)
  if (isNaN(idTest)) throw new Error('wrongParam')
  const asks = await getAsks(idTest)
  res.json(asks)
})

export default routerTest