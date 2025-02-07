import express from 'express'
import { getTests } from '@src/services/models'

const routerTest = express.Router()

// Recuperar todos la info de los tests que existen junto al nombre de usuario (GET api/test)
routerTest.get('/', async (_req, res) => {
  getTests((err, results) => {
    if (err) return res.status(500).json({ error: 'Se ha producido un error inesperado' })
    return res.json(results)
  })
})

export default routerTest