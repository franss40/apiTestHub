import mysql from 'mysql2'
import { config } from '@src/utils/config'

const { host, user, password, database } = config

const configConnection = {
  host: host,
  user: user,
  password: password,
  database: database
}

const conn = async () => {
  return await mysql.createConnection(configConnection)
}

export default conn 