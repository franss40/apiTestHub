import getTests from '@src/services/test'
import getAsks from '@src/services/ask'
import express from 'express'
const routerTest = express.Router()

// Recuperar todos los tests junto con el nombre de usuario (GET api/tests)
routerTest.get('/tests', (_req, res) => {
  getTests()
    .then(tests => {
      res.json(tests)
    })
    .catch((error) => {
      res.status(500).send({ message: `Se ha producido un error. ${error}` })
    })
})

// Recuperar todas las preguntas de un determinado test junto nombre de usuario
// y el nombre del test (GET api/test/:idTest)
routerTest.get('/test/:idTest', (_req, res) => {
  const idTest = Number(_req.params.idTest)
  if (!isNaN(idTest)) {
    getAsks(idTest)
      .then(asks => {
        res.json(asks)
      })
      .catch((error) => {
        res.status(500).send({ message: `Se ha producido un error. ${error}` })
      })
  } else {
    res.status(500).send({ message: 'El parámetro debe ser un número' })
  }
})

export default routerTest