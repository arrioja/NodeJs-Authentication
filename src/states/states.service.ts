import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { State } from './state.entity';

@Injectable()
export class StatesService extends TypeOrmCrudService<State> {

    constructor(@InjectRepository(State) repo) {
      super(repo);
    }

  }
