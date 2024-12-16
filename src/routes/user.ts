import express from 'express'
const routerUser = express.Router()
import { validarEmail, validarContraseña } from '@/src/utils/validation'

// Crear un nuevo usuario (POST api/user)
routerUser.post('/', async (_req, res) => {
  const { email, password, username } = _req.body
  if (!username.trim() || !validarEmail(email)) throw new Error('U')
  if (username.includes(' ')) throw new Error('U')
  if (!validarContraseña(password)) throw new Error('UC')

  res.send('validado')
})

export default routerUser