import { typeUser } from '@src/types/datasTypes'
import serviceBase from '@src/services/servicesBase'

async function createUser(email: string, password: string, username: string) {
  const sql = 'INSERT INTO usuario (email, password, username) VALUES (?, ?, ?)'
  return await serviceBase(sql, [email, password, username])
}

async function getUser(email: string): Promise<typeUser[] | []> {
  const sql = 'SELECT * FROM usuario WHERE email = ?'
  return await serviceBase(sql, [email]) as Promise<typeUser[] | []>
}

export { createUser, getUser }