import serviceBase from '@src/services/servicesBase'

async function getAsks(idTest: number) {
  const sql = 'SELECT ask.*, test.name, usuario.username \
                FROM ask inner join test on ask.test = test.idTest \
                inner join usuario on test.userEmail = usuario.email \
                WHERE test.idTest = ?'
  return await serviceBase(sql, [idTest])
}

export default getAsks