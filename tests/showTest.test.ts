import app from '@src/app'
import supertest from 'supertest'
// import { typeTest, typeAsk } from '@src/types/datasTypes'

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
    expect(response.body).toHaveProperty('error', 'Credenciales inválidas')
    expect(response.headers['content-type']).toMatch(/json/)
  })
})


/* describe('Probando rutas tests', () => {
  test('Verificar entorno de ejecución', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })

  test('Recuperando todos los tests: ruta GET /api/tests', async () => {
    const response = await api.get('/api/tests')
    const data: extendedTypeTest[] = response.body
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0].name).toBe('CAP DE MERCANCÍAS Y VIAJEROS DE TEST')
    expect(response.headers['content-type']).toMatch(/json/)

    const contents = data.map(name => name.name)
    expect(contents).toContain('CAP DE MERCANCÍAS Y VIAJEROS DE TEST')
  })

  test('Recuperando un test que no existe: ruta GET /api/test/1', async () => {
    const response = await api.get('/api/test/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(0)
    expect(response.headers['content-type']).toMatch(/json/)
  })

  test('Recuperando un test que existe: ruta GET /api/test/6', async () => {
    const response = await api.get('/api/test/6')
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2)
    expect(response.headers['content-type']).toMatch(/json/)

    const data: typeAsk[] = response.body
    const contents = data.map(name => name.ask)
    const ask1 = 'efectos de la aplicación de la normativa de extranjería, el llamado "Espacio Schengen" comprende países pertenecientes a:'
    const ask2 = '¿Es adecuado que un vehículo venga equipado con la mayor potencia posible para la carga que puede transportar?'
    expect(contents).toContain(ask1)
    expect(contents).toContain(ask2)
  })

  test('Recuperando un test que no es un número: ruta GET /api/test/error', async () => {
    const response = await api.get('/api/test/error')
    expect(response.status).toBe(400)
  }) 
})*/