import conn from '@src/services/conn'
import { QueryError, RowDataPacket } from 'mysql2'

interface callback {
  (err: QueryError | null, results: RowDataPacket[]): void
}

// Devolver las preguntas de un determinado test con idAsk
export const getAskXId = function (_idTest: number, callback: callback) {
  const sql = 'SELECT * FROM ask WHERE idAsk = ?'
  conn.query(sql, [_idTest], callback)
}

// Devolver las preguntas de un determinado test con idTest
export const getAsks = function (_idTest: number, callback: callback) {
  const sql = 'SELECT idAsk, ask, answer1, answer2, answer3, answer4, sol, multi, image, reference \
                FROM ask  \
                WHERE test = ?'
  conn.query(sql, [_idTest], callback)
}

// Crear una pregunta nueva
export const createAsk = async function (_idTest: number, _ask: string, _answer1: string, _answer2: string, _answer3: string, _answer4: string, _sol: number, _multi: boolean, _image: string, _reference: string, callback: callback) {
  const sql = 'INSERT INTO ask (test, ask, answer1, answer2, answer3, answer4, sol, multi, image, reference) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  conn.query(sql, [_idTest, _ask, _answer1, _answer2, _answer3, _answer4, _sol, _multi, _image, _reference], callback)
}

// Eliminar una pregunta existente
export const deleteAsk = async function (_idAsk: number, callback: callback) {
  const sql = 'DELETE FROM ask WHERE idAsk = ?'
  conn.query(sql, [_idAsk], callback)
}

// Actualizar una pregunta existente
export const updateAsk = async function (_idAsk: number, _ask: string, _answer1: string, _answer2: string, _answer3: string, _answer4: string, _sol: number, _multi: boolean, _image: string, _reference: string, callback: callback) {
  const sql = 'UPDATE ask SET ask = ?, answer1 = ?, answer2 = ?, answer3 = ?, answer4 = ?, sol = ?, multi = ?, image = ?, reference = ? WHERE idAsk = ?'
  conn.query(sql, [_ask, _answer1, _answer2, _answer3, _answer4, _sol, _multi, _image, _reference, _idAsk], callback)
}