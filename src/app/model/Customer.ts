import { User } from "./User";

export interface Customer {
  id: number,
  cpf: string,
  name: string,
  email: string,
  phone: string,
  companyId: number,
  senha: string
}
