import conn from '@/src/services/connection'

async function getTests() {
  const connect = await conn()
  return new Promise((resolve, reject) => {
    if (!connect) reject('No se pudo conectar a la base de datos')
    connect.query('SELECT * FROM test inner join usuario on test.userEmail = usuario.email', (err, rows) => {
      if (err)
        reject(err)
      else
        resolve(rows)
    })
  })
}

export default getTests