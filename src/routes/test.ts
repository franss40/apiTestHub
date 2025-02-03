import { getTests, getAsks, getUserTest } from '@src/services/models'
import express from 'express'

const routerTest = express.Router()

// Recuperar todos la info de los tests que existen junto al nombre de usuario (GET api/tests)
routerTest.get('/tests', async (_req, res) => {
  getTests((err, results) => {
    if (err) return res.status(500).json({ error: 'Se ha producido un error inesperado' })
    return res.json(results)
  })
})

// Recuperar las preguntas de un determinado test junto nombre de usuario y nombre del test (GET api/test/:idTest)
// Formato: 
// {info: {idTest, name, username}, 
// asks: [{idAsk, ask, answer1, answer2, answer3, answer4, sol, multi, image, reference}, ...]}
routerTest.get('/ask/:idTest', async (_req, res) => {
  const idTest = Number(_req.params.idTest)
  //if (isNaN(idTest)) throw new Error('wrongParam')
  if (isNaN(idTest)) {
    res.status(400).json({ error: 'El parámetro debe ser un número' })
    return
  }

  getAsks(idTest, (err, asks) => {
    if (err) return res.status(500).json({ error: 'Se ha producido un error inesperado' })
    return getUserTest(idTest, (err, results) => {
      if (err) return res.status(500).json({ error: 'Se ha producido un error inesperado' })
      if (!results || results.length === 0) return res.json({ info: [], asks: [] })
      return res.json({ info: results[0], asks })
    })
  })
})

export default routerTest