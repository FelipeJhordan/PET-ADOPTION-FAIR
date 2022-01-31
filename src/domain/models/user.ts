import { Person } from './person';
import { Role } from './role';

export class User {
  id: string;
  username?: string;
  password: string;
  person: Person;
  role?: Role;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  constructor(
    username: string,
    password: string,
    person: Person,
    role?: Role,
    id?: string,
    deletedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.person = person;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}