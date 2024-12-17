import conn from '@src/services/connection'
import { typeUser } from '@src/types/datasTypes'


async function createUser(email: string, password: string, username: string) {
  const connect = await conn()
  return new Promise((resolve, reject) => {
    if (!connect) reject('No se pudo conectar a la base de datos')
    const sql = 'INSERT INTO usuario (email, password, username) VALUES (?, ?, ?)'
    connect.query(sql, [email, password, username], (err, rows) => {
      if (err)
        reject(err)
      else
        resolve(rows)
    })
  })
}

async function getUser(email: string): Promise<typeUser[] | []> {
  const connect = await conn()
  return new Promise((resolve, reject) => {
    if (!connect) reject('No se pudo conectar a la base de datos')
    const sql = 'SELECT * FROM usuario WHERE email = ?'
    connect.query(sql, [email], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows as (typeUser[] | []))
      }
    })
  })
}

export { createUser, getUser }