import conn from '@src/services/connection'

async function serviceBase<tipo>(sql: string, params: tipo[] = []) {
  const connect = await conn()
  return new Promise((resolve, reject) => {
    if (!connect) reject('No se pudo conectar a la base de datos')
    connect.query(sql, params, (err, rows) => {
      connect.end()
      if (err)
        reject(err)
      else
        resolve(rows)
    })
  })
}

export default serviceBase