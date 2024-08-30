import { CartInterface } from "./cart";
export interface UserEntity {
  id: string;
  name: string;
  phone: string;
  password: string;
  email?: string;
  permission?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  password: string;
  email?: string;
  permission?: string;
  cart?: CartInterface;
}
