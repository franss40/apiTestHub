import conn from '@src/services/connection'

async function getTests() {
  const connect = await conn()
  return new Promise((resolve, reject) => {
    if (!connect) reject('No se pudo conectar a la base de datos')
    const sql = 'SELECT test.*, usuario.username FROM test inner join usuario on test.userEmail = usuario.email'
    connect.query(sql, (err, rows) => {
      if (err)
        reject(err)
      else
        resolve(rows)
    })
  })
}

export default getTests