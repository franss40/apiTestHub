export interface typeUser {
  username: string;
  email: string;
  password: string;
}

export interface typeTest {
  idTest: number;
  name: string;
  description: string;
  date: string;
  category: string[];
  userEmail: number;
}

export interface typeAsk {
  idAsk: number;
  ask: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  sol: string[];
  multi: boolean;
  image: string;
  reference: string;
  test: number;
}