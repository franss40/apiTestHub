import { NextFunction, Request, Response } from 'express'

// Error Usuario en contraseña >=8, algún númerico, algún especial (-_+*@#%&!), minúculas y mayúsculas

export const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }
  let statusCode
  let errorMessage

  switch (err.message) {
    case 'noAccess':
      statusCode = 401
      errorMessage = 'Credenciales inválidas'
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