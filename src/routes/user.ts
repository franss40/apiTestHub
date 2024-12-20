import express from 'express'
import { validarEmail, validarContraseña } from '@/src/utils/validation'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createUser, getUser } from '@src/services/user'
import { config } from '@src/utils/config'
import { authToken } from '../middleware/authToken'

const routerUser = express.Router()

// Crear un nuevo usuario (POST api/user/register)
routerUser.post('/register', async (_req, res) => {
  const { email, password, username } = _req.body as { email: string; password: string; username: string }
  if (!username.trim() || !validarEmail(email) || username.includes(' ') || !validarContraseña(password)) {
    throw new Error('invalidData')
  }

  const user = await getUser(email)
  if (user && user.length) throw new Error('emailExists')

  const hashPassword = await bcrypt.hash(password, 10)
  await createUser(email, hashPassword, username)
  res.status(201).json({ message: 'Usuario creado satisfactoriamente' })
})

// Hacer login al usuario creado (POST api/user/login)
routerUser.post('/login', async (_req, res) => {
  const { email, password } = _req.body as { email: string; password: string }
  if (!validarEmail(email) || !validarContraseña(password)) throw new Error('invalidData')

  const user = await getUser(email)
  if (!user || user.length === 0) throw new Error('noAccess')

  const isPasswordCorrect = await bcrypt.compare(password, user[0].password)
  if (!isPasswordCorrect) throw new Error('noAccess')

  const token = jwt.sign(
    { username: user[0].username, email: user[0].email },
    config.secret,
    { algorithm: 'HS256', expiresIn: '1h' }

  )
  res.json({ token })
})

routerUser.get('/', authToken, async (_req, res) => {
  res.json({ message: 'Hola, soy un usuario', user: _req.user })
})

export default routerUser