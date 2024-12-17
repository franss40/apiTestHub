import express from 'express'
const routerUser = express.Router()
import { validarEmail, validarContraseña } from '@/src/utils/validation'
import bcrypt from 'bcrypt'
import { createUser, getUser } from '@src/services/user'

// Crear un nuevo usuario (POST api/user)
routerUser.post('/', async (_req, res) => {
  const { email, password, username } = _req.body as { email: string; password: string; username: string }
  if (!username.trim() || !validarEmail(email) || username.includes(' ') || !validarContraseña(password)) {
    throw new Error('invalidData')
  }

  const user = await getUser(email)
  if (user && user.length) throw new Error('emailExists')

  const hashPassword = await bcrypt.hash(password, 10)
  await createUser(email, hashPassword, username)
  res.status(201).json({ message: 'Usuario creado' })
})

// Hacer login al usuario creado (POST api/user/login)
routerUser.post('/login', async (_req, res) => {
  const { email, password } = _req.body as { email: string; password: string }
  if (!validarEmail(email) || !validarContraseña(password)) throw new Error('invalidData')

  const user = await getUser(email)
  if (!user || user.length === 0) throw new Error('noAccess')

  const isPasswordCorrect = await bcrypt.compare(password, user[0].password)
  if (!isPasswordCorrect) throw new Error('noAccess')

  // FIXME: Si el usuario existe, se devuelve el token de acceso
  res.json(user[0])
})

export default routerUser