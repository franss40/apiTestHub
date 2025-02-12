import app from '@src/app'
import supertest from 'supertest'
import { typeTest } from '@src/types/datasTypes'
import conn from '@src/services/conn'
import { QueryError, RowDataPacket } from 'mysql2'

interface callback {
  (err: QueryError | null, results: RowDataPacket[]): void
}

// Borrar tablas de prueba
export const deleteTableTest = async function (callback: callback) {
  const sql = 'DELETE FROM test'
  conn.query(sql, callback)
}

export const deleteTableAsks = async function (callback: callback) {
  const sql = 'DELETE FROM test'
  conn.query(sql, callback)
}

export const deleteTableUser = async function (callback: callback) {
  const sql = 'DELETE FROM usuario'
  conn.query(sql, callback)
}


// type extendedTypeTest = typeTest & { username: string }

const api = supertest(app)

let token: string
let idTest: number
let idAsk: number

// vaciar las tablas de prueba antes de hacer cualquier prueba
beforeAll((done) => {
  deleteTableTest((err) => {
    if (err) return done(new Error('Error al borrar la tabla test'))
    deleteTableAsks((err) => {
      if (err) return done(new Error('Error al borrar la tabla ask'))
      deleteTableUser((err) => {
        if (err) return done(new Error('Error al borrar la tabla user'))
        done()
      })
    })
  })
})

beforeEach(() => {
})

afterAll(async () => {
  await conn.end()
})

// NOTE: Verificamdo entorno de ejecución
describe('Verify execution environment', () => {

  test('Execution environment is test', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })
})

// NOTE: Creando Usuario
describe('Create user', () => {

  test('Add new user', async () => {
    const response = await api
      .post('/api/user/register')
      .set('Content-Type', 'application/json')
      .send({
        email: 'test4@test.com',
        password: 'ajA3dg1-',
        username: 'Pedro'
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message', 'Usuario creado satisfactoriamente')
    expect(response.headers['content-type']).toMatch(/json/)
  })

  test('Add an existing user', async () => {
    const response = await api
      .post('/api/user/register')
      .set('Content-Type', 'application/json')
      .send({
        email: 'test4@test.com',
        password: 'ajA3dg1-',
        username: 'Pedro'
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error', 'emailExists')
    expect(response.headers['content-type']).toMatch(/json/)
  })

  test('Add a wrong user (wrong email)', async () => {
    const response = await api
      .post('/api/user/register')
      .set('Content-Type', 'application/json')
      .send({
        email: 'test4test.com',
        password: 'ajA3dg1-',
        username: 'Pedro'
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error', 'No deben de faltar datos y la contraseña debe tener al menos 8 carácteres,\
                     mayúscula, minúsculas, númerico y especial (-_+*@#%&!)')
    expect(response.headers['content-type']).toMatch(/json/)
  })

  test('Add users with empty fields', async () => {
    const response = await api
      .post('/api/user/register')
      .set('Content-Type', 'application/json')
      .send({
        email: 'test@test.com',
        password: '',
        username: ''
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error', 'No deben de faltar datos y la contraseña debe tener al menos 8 carácteres,\
                     mayúscula, minúsculas, númerico y especial (-_+*@#%&!)')
    expect(response.headers['content-type']).toMatch(/json/)
  })
})

// NOTE: Login a Usuario
describe('User Login', () => {

  test('login to a malformed email', async () => {
    const response = await api
      .post('/api/user/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'tesff4test.com',
        password: 'aaaa',
      })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error', 'No deben de faltar datos y la contraseña debe tener al menos 8 carácteres,\
                     mayúscula, minúsculas, númerico y especial (-_+*@#%&!)')
  })

  test('Login with wrong password', async () => {
    const response = await api
      .post('/api/user/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'test4@test.com',
        password: 'aaaaJ4_11',
      })
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error', 'No Access')
  })

  test('login user no exist', async () => {
    const response = await api
      .post('/api/user/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'tesff4@test.com',
        password: 'aaaaJ4_11',
      })
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error', 'No Access')
  })

  test('Correct User Login', async () => {
    const response = await api
      .post('/api/user/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'test4@test.com',
        password: 'ajA3dg1-',
      })

    token = response.body.token
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token', token)
  })

})

// NOTE: Comprobar el acceso a una ruta de prueba con autentificación
describe('Comprobar acceso a una ruta', () => {

  test('Access to private route', async () => {
    const response = await api
      .get('/api/user')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'Hola, soy un usuario')
    expect(response.headers['content-type']).toMatch(/json/)
  })

  test('No Access to private route', async () => {
    const response = await api
      .get('/api/user')
      .set('Content-Type', 'application/json')

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('message', 'Token invalid')
    expect(response.headers['content-type']).toMatch(/json/)
  })
})

// NOTE: Crear un nuevo test
describe('Create new test', () => {
  test('Create new test', async () => {
    const response = await api
      .post('/api/test/')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test de prueba',
        description: 'Este es un test de prueba',
        category: 'Test'
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message', 'Test creado satisfactoriamente')
    expect(response.headers['content-type']).toMatch(/json/)
  })
})

// NOTE: Crear un nuevo ask
describe('Create new ask', () => {
  test('Create new ask', async () => {
    const response2 = await api
      .get('/api/test/')

    expect(response2.status).toBe(200)
    expect(response2.headers['content-type']).toMatch(/json/)
    expect(response2.body).toHaveLength(1)
    const contents = response2.body.map((r: typeTest) => r.name)
    expect(contents).toContain('Test de prueba')
    idTest = response2.body[0].idTest

    const response = await api
      .post(`/api/ask/${idTest}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ask: '¿País mediterráneo de Europa?',
        answer1: 'España',
        answer2: 'Francia',
        answer3: 'Alemania',
        answer4: '',
        sol: 1,
        multi: false,
        image: '',
        reference: '',
      })

    expect(response.status).toBe(201)
    expect(response.headers['content-type']).toMatch(/json/)
  })
})

// NOTE: Actualizar un test y sus preguntas
describe('Update test y sus preguntas', () => {
  test('Update test', async () => {
    const response2 = await api
      .get(`/api/ask/${idTest}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response2.status).toBe(200)
    expect(response2.headers['content-type']).toMatch(/json/)
    expect(response2.body.asks).toHaveLength(1)
    idAsk = response2.body.asks[0].idAsk

    const response = await api
      .put(`/api/test/${idTest}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Cambiando el nombre',
        description: 'Cambiando la descripción',
        category: 'Test, prueba',
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'Test actualizado satisfactoriamente')
    expect(response.headers['content-type']).toMatch(/json/)

    const response3 = await api
      .get('/api/test')

    expect(response3.status).toBe(200)
    expect(response3.headers['content-type']).toMatch(/json/)
    expect(response3.body[0]).toHaveProperty('name', 'Cambiando el nombre')
    expect(response3.body[0]).toHaveProperty('description', 'Cambiando la descripción')
    expect(response3.body[0]).toHaveProperty('category', 'Test, prueba')
  })

  test('Update ask', async () => {
    const ruta = `/api/ask/${idAsk}`
    const response = await api
      .put(ruta)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ask: '¿País mediterráneo del continente europeo?',
        answer1: 'Reino de España',
        answer2: 'País de Francia',
        answer3: 'País de Alemania',
        answer4: 'Inglaterra',
        sol: 2,
        multi: false,
        image: '',
        reference: '',
      })
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('message', 'Pregunta actualizada satisfactoriamente')

    const response3 = await api
      .get(`/api/ask/${idTest}`)

    expect(response3.status).toBe(200)
    expect(response3.headers['content-type']).toMatch(/json/)
    console.log('respuesta', response3.body)
    expect(response3.body.asks[0]).toHaveProperty('ask', '¿País mediterráneo del continente europeo?')
    expect(response3.body.asks[0]).toHaveProperty('answer1', 'Reino de España')
  })
})

// NOTE: Eliminar un test y sus preguntas
describe('Delete test y sus preguntas', () => {
  test('Delete ask', async () => {
    const ruta = `/api/ask/${idAsk}`
    const response = await api
      .delete(ruta)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(204)

    const response2 = await api
      .get(`/api/ask/${idTest}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response2.status).toBe(200)
    expect(response2.headers['content-type']).toMatch(/json/)
    expect(response2.body.asks).toHaveLength(0)
  })

  test('Delete test', async () => {
    const response = await api
      .delete(`/api/test/${idTest}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(204)

    const response2 = await api
      .get('/api/test/')

    expect(response2.status).toBe(200)
    expect(response2.headers['content-type']).toMatch(/json/)
    expect(response2.body).toHaveLength(0)
  })
})