import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '@src/utils/config'

declare module 'express-serve-static-core' {
  interface Request {
    user?: { username: string; email: string }
  }
}

export const authToken = (_req: Request, _res: Response, next: NextFunction) => {
  try {
    const auth = _req.get('authorization') as string
    if (!auth || !auth.startsWith('Bearer ')) {
      _res.status(401).json({ message: 'Token invalid' })
      return
    }

    const token = auth.split(' ')[1]
    const verifyToken = jwt.verify(token, config.secret) as { username: string; email: string }
    _req.user = verifyToken
    next()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    if (!_res.headersSent) {
      _res.status(401).json({ message: 'Token invalid' })
    }
  }
}