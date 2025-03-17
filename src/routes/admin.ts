import express from 'express'
import { getTestsByUser } from '../services/testModel'

const routerAdmin = express.Router()

// Recuperar todos los tests creados por un usuario (GET api/admin/:idUser)
routerAdmin.get('/:idUser', async (_req, res) => {
  const idUser = Number(_req.params.idUser)
  if (isNaN(idUser)) {
    res.status(400).json({
      error: 'El parámetro debe ser un número'
    })
    return
  }
  getTestsByUser(idUser, (err, results) => {
    if (err) return res.status(500).json({ error: 'Se ha producido un error inesperado' })
    return res.json(results)
  })
})

export default routerAdmin