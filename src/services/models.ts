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

// Recupero un determinado test con un idTest
export const getTestXId = function (_idTest: number, callback: callback) {
  const sql = 'SELECT * FROM test WHERE idTest = ?'
  conn.query(sql, [_idTest], callback)
}

// Devolver las preguntas de un determinado test con idTest (getAsks)
export const getAskXId = function (_idTest: number, callback: callback) {
  const sql = 'SELECT * FROM ask WHERE idAsk = ?'
  conn.query(sql, [_idTest], callback)
}

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

// Crear un test nuevo
export const createTest = async function (_name: string, _description: string, _category: string, _userEmail: string, callback: callback) {
  const sql = 'INSERT INTO test (name, description, category, date, userEmail) VALUES (?, ?, ?, CURDATE(), ?)'
  conn.query(sql, [_name, _description, _category, _userEmail], callback)
}

// Crear una pregunta nueva
export const createAsk = async function (_idTest: number, _ask: string, _answer1: string, _answer2: string, _answer3: string, _answer4: string, _sol: number, _multi: boolean, _image: string, _reference: string, callback: callback) {
  const sql = 'INSERT INTO ask (test, ask, answer1, answer2, answer3, answer4, sol, multi, image, reference) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  conn.query(sql, [_idTest, _ask, _answer1, _answer2, _answer3, _answer4, _sol, _multi, _image, _reference], callback)
}

// Eliminar un test existente
export const deleteTest = async function (_idTest: number, callback: callback) {
  const sql = 'DELETE FROM test WHERE idTest = ?'
  conn.query(sql, [_idTest], callback)
}

// Eliminar una pregunta existente
export const deleteAsk = async function (_idAsk: number, callback: callback) {
  const sql = 'DELETE FROM ask WHERE idAsk = ?'
  conn.query(sql, [_idAsk], callback)
}

// Actualizar un test existente
export const updateTest = async function (_idTest: number, _name: string, _description: string, _category: string, callback: callback) {
  const sql = 'UPDATE test SET name = ?, description = ?, category = ? WHERE idTest = ?'
  conn.query(sql, [_name, _description, _category, _idTest], callback)
}

// Actualizar una pregunta existente
export const updateAsk = async function (_idAsk: number, _ask: string, _answer1: string, _answer2: string, _answer3: string, _answer4: string, _sol: number, _multi: boolean, _image: string, _reference: string, callback: callback) {
  const sql = 'UPDATE ask SET ask = ?, answer1 = ?, answer2 = ?, answer3 = ?, answer4 = ?, sol = ?, multi = ?, image = ?, reference = ? WHERE idAsk = ?'
  conn.query(sql, [_ask, _answer1, _answer2, _answer3, _answer4, _sol, _multi, _image, _reference, _idAsk], callback)
}