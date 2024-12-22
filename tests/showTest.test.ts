import supertest from 'supertest'
import app from '@src/app'
import { typeTest } from '@src/types/datasTypes'

type extendedTypeTest = typeTest & { username: string }

const api = supertest(app)

test('Probando ruta GET /api/tests', async () => {
  const response = await api.get('/api/tests')
  const data: extendedTypeTest[] = response.body
  expect(response.status).toBe(200)
  expect(response.body).toHaveLength(1)
  expect(response.body[0].name).toBe('CAP DE MERCANCÍAS Y VIAJEROS')
  expect(response.headers['content-type']).toMatch(/json/)


  const contents = data.map(name => name.name)
  expect(contents).toContain('CAP DE MERCANCÍAS Y VIAJEROS')

  /* await api
      .get('/api/tests')
      .expect(200)
      .expect('Content-Type', /json/) */
})