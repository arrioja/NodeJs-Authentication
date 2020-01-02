import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { IdType } from './idtype.entity';

@Injectable()
export class IdTypesService extends TypeOrmCrudService<IdType> {

    constructor(@InjectRepository(IdType) repo) {
      super(repo);
    }

  }
