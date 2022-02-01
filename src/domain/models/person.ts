import { User } from './user';

export class Person {
  id: string;
  name?: string;
  address: string;
  email?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  user?: User;
  constructor(
    address: string,
    name?: string,
    email?: string,
    phone?: string,
    id?: string,
    deletedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date,
    user?: User,
  ) {
    this.address = address;
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.user = user;
  }
}
