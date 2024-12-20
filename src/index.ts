import app from '@/src/app'
import { config } from '@src/utils/config'

const { port, host } = config

app.listen(port, () => {
  console.log(`Server running on http://${host}:${port}`)
})