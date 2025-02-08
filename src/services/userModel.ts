import conn from '@src/services/conn'
import { QueryError, RowDataPacket } from 'mysql2'

interface callback {
  (err: QueryError | null, results: RowDataPacket[]): void
}

// Registrar un nuevo usuario
export const registerUser = async function (_email: string, _password: string, _username: string, callback: callback) {
  const sql = 'INSERT INTO usuario (email, password, username) VALUES (?, ?, ?)'
  conn.query(sql, [_email, _password, _username], callback)
}

// Recuperar un usuario por su email
export const getUser = async function (_email: string, callback: callback) {
  const sql = 'SELECT * FROM usuario WHERE email = ?'
  conn.query(sql, [_email], callback)
}