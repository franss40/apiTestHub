import getTests from '@src/services/test'
import getAsks from '@src/services/ask'
import express from 'express'
const routerTest = express.Router()

// Recuperar todos los tests (GET api/tests)
routerTest.get('/tests', async (_req, res) => {
  try {
    const tests = await getTests()
    res.json(tests)
  } catch (error) {
    res.status(500).send({ message: `Se ha producido un error. ${error}` })
  }
})

// Recuperar todas las preguntas de un determinado test (GET api/test/:idTest)
routerTest.get('/test/:idTest', async (_req, res) => {
  try {
    const idTest = Number(_req.params.idTest)
    if (isNaN(idTest)) throw 'El parámetro debe ser un número'
    const asks = await getAsks(idTest)
    res.json(asks)
  } catch (error) {
    res.status(500).send({ message: `Se ha producido un error. ${error}` })
  }
})

export default routerTest