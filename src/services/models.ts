import conn from '@src/services/conn'
import { QueryError, RowDataPacket } from 'mysql2'

interface callback {
  (err: QueryError | null, results: RowDataPacket[]): void
}

// Recupero todos los tests junto con el nombre de usuario
export const getTests = function (callback: callback) {
  const sql = 'SELECT test.*, usuario.username FROM test inner join usuario on test.userEmail = usuario.email'
  conn.query(sql, callback)
}

// Devolver las preguntas de un determinado test con idTest
export const getAsks = function (_idTest: number, callback: callback) {
  const sql = 'SELECT idAsk, ask, answer1, answer2, answer3, answer4, sol, multi, image, reference \
                FROM ask  \
                WHERE test = ?'
  conn.query(sql, [_idTest], callback)
}

// Devolver el nombre de usuario de un test y el nombre del test dado el idTest
export const getUserTest = function (_idTest: number, callback: callback) {
  const sql = 'SELECT test.idTest, test.name, usuario.username \
                FROM test inner join usuario on test.userEmail = usuario.email \
                WHERE test.idTest = ?'
  conn.query(sql, [_idTest], callback)
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