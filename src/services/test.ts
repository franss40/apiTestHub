import serviceBase from '@src/services/servicesBase'

async function getTests() {
  const sql = 'SELECT test.*, usuario.username FROM test inner join usuario on test.userEmail = usuario.email'
  return await serviceBase(sql, [])
}

export default getTests