import { Customer } from "./Customer";

export interface Redeem {
  code?: string,
  amount: number,
  timestamp?: Date,
  companyId: number,
  customer?: Customer
}
