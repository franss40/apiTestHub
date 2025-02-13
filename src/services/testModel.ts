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
  const sql = 'SELECT test.*, usuario.username FROM test inner join usuario on test.userEmail = usuario.email WHERE test.idTest = ?'
  conn.query(sql, [_idTest], callback)
}

// Devolver el nombre de usuario de un test y el nombre del test dado el idTest
export const getUserTest = function (_idTest: number, callback: callback) {
  const sql = 'SELECT test.idTest, test.name, usuario.username \
                FROM test inner join usuario on test.userEmail = usuario.email \
                WHERE test.idTest = ?'
  conn.query(sql, [_idTest], callback)
}

// Crear un test nuevo
export const createTest = async function (_name: string, _description: string, _category: string, _userEmail: string, callback: callback) {
  const sql = 'INSERT INTO test (name, description, category, date, userEmail) VALUES (?, ?, ?, CURDATE(), ?)'
  conn.query(sql, [_name, _description, _category, _userEmail], callback)
}

// Eliminar un test existente
export const deleteTest = async function (_idTest: number, callback: callback) {
  const sql = 'DELETE FROM test WHERE idTest = ?'
  conn.query(sql, [_idTest], callback)
}

// Actualizar un test existente
export const updateTest = async function (_idTest: number, _name: string, _description: string, _category: string, callback: callback) {
  const sql = 'UPDATE test SET name = ?, description = ?, category = ? WHERE idTest = ?'
  conn.query(sql, [_name, _description, _category, _idTest], callback)
}