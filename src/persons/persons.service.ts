import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Person } from './person.entity';

@Injectable()
export class PersonsService extends TypeOrmCrudService<Person> {

    constructor(@InjectRepository(Person) repo) {
      super(repo);
    }

  }
