import { typeUser, typeTest, typeAsk } from '@/src/types/datasTypes'

export const dataUser: typeUser[] = [
  {
    "username": "prueba",
    "email": "test@gmail.com",
    "password": "12345678"
  }
]


export const dataTest: typeTest[] = [
  {
    "idTest": 1,
    "name": "Esto es un test",
    "description": "test sobre el api",
    "date": "2017-01-01",
    "category": ["api", "test"],
    "userEmail": 1
  }
]

export const dataAsk: typeAsk[] = [
  {
    "idAsk": 1,
    "ask": "Quién es el presidente de la república argentina?",
    "answer1": "Cristina Kirchner",
    "answer2": "Cristina Kirchner",
    "answer3": "Juan Fernández",
    "answer4": "Milei",
    "sol": ["A"],
    "multi": false,
    "image": "foto.jpg",
    "reference": "https://www.google.com",
    "test": 1
  },
  {
    "idAsk": 1,
    "ask": "Quién es el presidente de España?",
    "answer1": "P.Sánchez",
    "answer2": "Pedro Sánchez",
    "answer3": "Juan Fernández",
    "answer4": "Milei",
    "sol": ['B', 'A'],
    "multi": true,
    "image": "foto2.jpg",
    "reference": "https://www.google.com",
    "test": 1
  }
]