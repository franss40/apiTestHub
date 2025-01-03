import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '@src/utils/config'

declare module 'express-serve-static-core' {
  interface Request { token?: string | null, user?: unknown }
}

export const authToken = (_req: Request, _res: Response, next: NextFunction) => {
  const auth = _req.get('authorization')

  if (!auth || !auth.startsWith('Bearer ')) {
    throw new Error('noAccess')
  }

  try {
    const verifyToken = jwt.verify(auth.split(' ')[1], config.secret)
    _req.user = verifyToken
    next()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('noAccess')
  }
}