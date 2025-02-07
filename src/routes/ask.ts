import express from 'express'
import { getAsks, getUserTest } from '@src/services/models'

const routerAsk = express.Router()

// Recuperar las preguntas de un determinado test junto nombre de usuario y nombre del test (GET api/test/:idTest)
// {info: {idTest, name, username}, asks: [{idAsk, ask, answer1, answer2, answer3, answer4, sol, multi, image, reference}, ...]}
routerAsk.get('/:idTest', async (_req, res) => {
  const idTest = Number(_req.params.idTest)
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



export default routerAsk