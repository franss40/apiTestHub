import dotenv from 'dotenv'
dotenv.config()

const database = process.env.NODE_ENV === 'development' ? process.env.DATABASE : process.env.DATABASE_TEST

export const config = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  user: process.env.USER || 'root',
  database: database || 'testhub',
  password: process.env.PASSWORD || '',
  secret: process.env.JWT_SECRET || 'default_secret',
}