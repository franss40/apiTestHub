import express from 'express'
import { getTests, createTest } from '@src/services/models'
import { authToken } from '@src/middleware/authToken'

const routerTest = express.Router()

// Recuperar todos la info de los tests que existen junto al nombre de usuario (GET api/test)
routerTest.get('/', async (_req, res) => {
  getTests((err, results) => {
    if (err) return res.status(500).json({ error: 'Se ha producido un error inesperado' })
    return res.json(results)
  })
})

// Add new test (POST api/test/create)
routerTest.post('/create', authToken, async (_req, res) => {
  const user = _req.user

  const { name, description, category } = _req.body as { name: string; description: string; category: string }
  if (!name.trim() || !description.trim() || !category.trim() || !user?.email.trim()) {
    res.status(400).json({
      error: 'missing data'
    })
    return
  }

  createTest(name, description, category, user?.email, (err) => {
    if (err) return res.status(500).json({ error: 'Se ha producido un error inesperado' })
    return res.status(201).json({ message: 'Test creado satisfactoriamente' })
  })
})

export default routerTest