import express from 'express'
import { getAsks, getUserTest, createAsk, getAskXId, getTestXId, deleteAsk } from '@src/services/models'
import { authToken } from '@src/middleware/authToken'

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


// Create new ask (POST api/ask/create/:id)
routerAsk.post('/create/:idTest', authToken, async (_req, res) => {
  const test = Number(_req.params.idTest)

  const { ask, answer1, answer2, answer3, answer4, sol, multi, image, reference } = _req.body as {
    ask: string
    answer1: string
    answer2: string
    answer3: string
    answer4: string
    sol: number
    multi: boolean
    image: string
    reference: string
  }

  if (!test || !ask || !answer1 || !answer2 || !Number.isInteger(test)) {
    res.status(400).json({
      error: 'missing data'
    })
    return
  }

  if (sol < 1 || sol > 4 || !sol || !Number.isInteger(sol)) {
    res.status(400).json({
      error: 'missing solution or wrong solution'
    })
    return
  }

  getTestXId(test, async (err, results) => {
    if (err) return res.status(500).json({ error: 'Se ha producido un error inesperado' })
    if (!results || results.length === 0) return res.status(404).json({ error: 'Test no encontado' })
    return createAsk(test, ask, answer1, answer2, answer3, answer4, sol, !!multi, image, reference, (err) => {
      if (err) return res.status(500).json({ error: 'Se ha producido un error inesperado' })
      return res.status(201).json({ message: 'Pregunta creada satisfactoriamente' })
    })
  })
})

// Delete Ask (DELETE api/ask/:idTest)
routerAsk.delete('/:idAsk', authToken, async (_req, res) => {
  const idAsk = Number(_req.params.idAsk)
  if (isNaN(idAsk)) {
    res.status(400).json({
      error: 'El parámetro debe ser un número'
    })
    return
  }

  getAskXId(idAsk, async (err, results) => {
    if (err) return res.status(500).json({ error: 'Se ha producido un error inesperado' })
    if (!results || results.length === 0) return res.status(404).json({ error: 'Pregunta no encontada' })
    return deleteAsk(idAsk, (err) => {
      if (err) return res.status(500).json({ error: 'Se ha producido un error inesperado' })
      return res.status(204).json({ message: 'Pregunta eliminada satisfactoriamente' })
    })
  })
})

export default routerAsk