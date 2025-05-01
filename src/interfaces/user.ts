import { Role } from "../enums/Role";

export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: Role;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
