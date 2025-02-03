import mysql from 'mysql2'
import { config } from '@src/utils/config'

const { host, user, password, database } = config

const configConnection = {
  host: host,
  user: user,
  password: password,
  database: database
}

const conn = mysql.createConnection(configConnection)

conn.connect((err) => {
  if (err) console.log('No se pudo conectar a la base de datos. ' + err)
  //if (err) throw new Error('No se pudo conectar a la base de datos. ' + err)
})

export default conn