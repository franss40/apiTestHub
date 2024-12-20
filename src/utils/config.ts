process.loadEnvFile()

export const config = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  database: process.env.DATABASE || 'testHub',
  user: process.env.USER || 'root',
  password: process.env.PASSWORD || '',
  node_env: process.env.NODE_ENV || 'development',
  secret: process.env.JWT_SECRET || 'default_secret',
}