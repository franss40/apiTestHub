import mysql from 'mysql2'

process.loadEnvFile()
const { HOST, USER, PASSWORD, DATABASE } = process.env

const config = {
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE
}

const conn = async () => {
  return await mysql.createConnection(config)
}

export default conn 