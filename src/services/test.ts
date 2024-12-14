import conn from '@/src/services/connection'

async function test() {
  const connect = await conn()
  return new Promise((resolve, reject) => {
    if (!connect) reject('No se pudo conectar a la base de datos')
    connect.query('SELECT * FROM producto', (err, rows) => {
      if (err)
        reject(err)
      else
        resolve(rows)
    })
  })
}

export default test