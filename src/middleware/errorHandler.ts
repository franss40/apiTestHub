import { NextFunction, Request, Response } from 'express'

// T = Error en la zona de Test
// U = Error en la zona de Usuario
// UC = Error Usuario en contraseña >=8, algún númerico, algún especial (-_+*@#%&!), minúculas y mayúsculas

export const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }
  let statusCode
  let errorMessage

  switch (err.message) {
    case 'wrongParam':
      statusCode = 400
      errorMessage = 'El parámetro debe ser un número'
      break
    case 'invalidData':
      statusCode = 400
      errorMessage = 'No deben de faltar datos y la contraseña debe tener al menos 8 carácteres,\
                     mayúscula, minúsculas, númerico y especial (-_+*@#%&!)'
      break
    case 'noAccess':
      statusCode = 401
      errorMessage = 'Usuario o contraseña incorrecta'
      break
    case 'emailExists':
      statusCode = 401
      errorMessage = 'Este email ya existe'
      break
    case 'JsonWebTokenError':
      statusCode = 401
      errorMessage = 'token invalid'
      break
    default:
      statusCode = 500
      errorMessage = 'Se ha producido un error'
  }
  res.status(statusCode).json({ error: errorMessage })
}