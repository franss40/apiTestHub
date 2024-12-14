import { Request, Response, NextFunction } from 'express'

export const unknownEndPoint = (_req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({ error: 'Endpoint not found' })
  next()
}