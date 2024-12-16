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
    case 'T':
      statusCode = 400
      errorMessage = 'El parámetro debe ser un número'
      break
    case 'UC':
      statusCode = 400
      errorMessage = 'La contraseña debe tener al menos 8 carácteres,\
                     mayúscula, minúsculas, númerico y especial (-_+*@#%&!)'
      break
    case 'U':
      statusCode = 400
      errorMessage = 'Faltan datos para poder crear el usuario'
      break
    case 'JsonWebTokenError':
      statusCode = 401
      errorMessage = 'token invalid'
      break
    case 'CastError':
      statusCode = 400
      errorMessage = 'malformatted id'
      break
    case 'ValidationError':
      statusCode = 404
      errorMessage = err.message
      break
    default:
      statusCode = 500
      errorMessage = 'Se ha producido un error'
  }
  res.status(statusCode).json({ error: errorMessage })
}