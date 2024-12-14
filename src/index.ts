import app from '@/src/app'

process.loadEnvFile()
const { PORT = 3001, HOST = 'http://localhost' } = process.env

app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`)
})