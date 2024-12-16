function validarEmail(email: string) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return regex.test(email)
}

function validarContraseña(password: string) {
  const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[-_+*@#%&!]).{8,16}$/
  return regex.test(password)
}

export { validarEmail, validarContraseña }