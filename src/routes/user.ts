import express from 'express'
import { validarEmail, validarContraseña } from '@src/utils/validation'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '@src/utils/config'
import { authToken } from '../middleware/authToken'
import rateLimit from 'express-rate-limit'
import { registerUser, getUser } from '../services/models'

const routerUser = express.Router()

const limiterLogin = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 100 requests per windowMs
  message: 'Demasiados intentos de login desde esta IP, por favor intenta de nuevo después de 15 minutos',
})

// Crear un nuevo usuario (POST api/user/register)
routerUser.post('/register', async (_req, res) => {
  const { email, password, username } = _req.body as { email: string; password: string; username: string }
  if (!username.trim() || !validarEmail(email) || username.includes(' ') || !validarContraseña(password)) {
    res.status(400).json({
      error: 'No deben de faltar datos y la contraseña debe tener al menos 8 carácteres,\
                     mayúscula, minúsculas, númerico y especial (-_+*@#%&!)'
    })
    return
  }

  getUser(email, async (err, user) => {
    if (err) return res.status(500).json({ error: 'Se ha producido un error inesperado' })
    if (user && user.length) return res.status(400).json({ error: 'emailExists' })
    const hashPassword = await bcrypt.hash(password, 10)

    return registerUser(email, hashPassword, username, (err) => {
      if (err) return res.status(500).json({ error: 'Se ha producido un error en la consulta' })
      return res.status(201).json({ message: 'Usuario creado satisfactoriamente' })
    })
  })
})

// Hacer login al usuario creado (POST api/user/login)
routerUser.post('/login', limiterLogin, async (_req, res) => {
  const { email, password } = _req.body as { email: string; password: string }
  if (!validarEmail(email) || !validarContraseña(password)) {
    res.status(400).json({
      error: 'No deben de faltar datos y la contraseña debe tener al menos 8 carácteres,\
                     mayúscula, minúsculas, númerico y especial (-_+*@#%&!)'
    })
    return
  }

  getUser(email, async (err, user) => {
    if (err) return res.status(500).json({ error: 'Error en la consulta a la base de datos' })
    // if (err) throw new Error('Error en la consulta')
    if (!user || user.length === 0) return res.status(401).json({ error: 'No Access' })

    const isPasswordCorrect = await bcrypt.compare(password, user[0].password)
    if (!isPasswordCorrect) return res.status(401).json({ error: 'No Access' })

    const token = jwt.sign(
      { username: user[0].username, email: user[0].email },
      config.secret,
      { algorithm: 'HS256', expiresIn: '1h' }
    )
    return res.json({ token })
  })
})

routerUser.get('/', authToken, async (_req, res) => {
  res.json({ message: 'Hola, soy un usuario', user: _req.user })
})

export default routerUser