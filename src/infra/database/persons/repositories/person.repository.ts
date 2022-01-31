import { Person } from 'domain/models/person';
import { EntityRepository, Repository } from 'typeorm';
import { PersonEntity } from '../entities/person.entity';

@EntityRepository(PersonEntity)
export class PersonRepository extends Repository<Person> {}
