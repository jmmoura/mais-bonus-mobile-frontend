import { User } from "./User";

export interface Company {
  id: number,
  cnpj: string,
  name: string,
  email: string,
  phone: string,
  password: string
}
