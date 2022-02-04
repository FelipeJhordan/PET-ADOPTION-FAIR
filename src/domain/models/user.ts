import { Person } from './person';
import { Pet } from './pet';
import { Role } from './role';

export class User {
  id: string;
  username?: string;
  password: string;
  role?: Role;
  person?: Person;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  pets?: Pet[];
  constructor(
    username: string,
    password: string,
    person?: Person,
    role?: Role,
    id?: string,
    deletedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date,
    pets?: Pet[],
  ) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.person = person;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.pets = pets;
  }
}
