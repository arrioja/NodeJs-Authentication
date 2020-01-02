import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Person } from './person.entity';
import { PersonsService } from './persons.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../roles.decorators';
import { RolesAllowed } from '../roles.obfuscation';

@Crud({
    model: {
      type: Person,
    },
    routes: {
      only: ['getOneBase', 'getManyBase', 'createOneBase', 'updateOneBase', 'deleteOneBase'],
      exclude: ['createManyBase', 'replaceOneBase'],
      getManyBase: {
        decorators: [
          UseGuards(AuthGuard('jwt')),
        ],
      },
      getOneBase: {
        decorators: [
          UseGuards(AuthGuard('jwt')),
        ],
      },
      createOneBase: {
        decorators: [
          UseGuards(AuthGuard('jwt')),
        ],
      },
      updateOneBase: {
        decorators: [
          UseGuards(AuthGuard('jwt')),
        ],
      },
      deleteOneBase: {
        decorators: [
          UseGuards(AuthGuard('jwt'), RolesGuard),
          Roles(RolesAllowed.HIGH_STAFF, RolesAllowed.ADMIN, RolesAllowed.ROOT),
        ],
      },
    },
    query: {
        join: {
          idType: {
            eager: true,
            exclude: ['status', 'created', 'updated'],
          },
          nationality: {
            eager: true,
            exclude: ['status', 'created', 'updated'],
          },
          country: {
            eager: true,
            exclude: ['status', 'created', 'updated'],
          },
          state: {
            eager: true,
            exclude: ['status', 'created', 'updated'],
          },
          city: {
            eager: true,
            exclude: ['status', 'created', 'updated'],
          },
          user: {
            eager: true,
            exclude: ['password', 'salt', 'status', 'created', 'updated'],
          },
          favorites: {
            eager: true,
            exclude: ['status', 'created', 'updated'],
          },
        },
      },
  })

@Controller('persons')
export class PersonsController {
    constructor(public service: PersonsService) {}
}
