import conn from '@src/services/connection'

async function getAsks(idTest: number) {
  const connect = await conn()
  return new Promise((resolve, reject) => {
    if (!connect) reject('No se pudo conectar a la base de datos')
    const sql = 'SELECT ask.*, test.name, usuario.username \
                FROM ask inner join test on ask.test = test.idTest \
                inner join usuario on test.userEmail = usuario.email \
                WHERE test.idTest = ?'
    connect.query(sql, [idTest], (err, rows) => {
      if (err)
        reject(err)
      else
        resolve(rows)
    })
  })
}

export default getAsks