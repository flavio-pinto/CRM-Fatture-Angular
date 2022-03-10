export interface User {
  id : number;
  username: string;
  email: string;
  password: string;
  nome: string;
  cognome: string;
  roles: [
    {
      id: number,
      roleName: string
    }
  ]
}
