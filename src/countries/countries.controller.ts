import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Country } from './country.entity';
import { CountriesService } from './countries.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../roles.decorators';
import { RolesAllowed } from '../roles.obfuscation';

@Crud({
    model: {
      type: Country,
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
          UseGuards(AuthGuard('jwt'), RolesGuard),
          Roles(RolesAllowed.LOW_STAFF, RolesAllowed.HIGH_STAFF, RolesAllowed.ADMIN, RolesAllowed.ROOT),
        ],
      },
      updateOneBase: {
        decorators: [
          UseGuards(AuthGuard('jwt'), RolesGuard),
          Roles(RolesAllowed.HIGH_STAFF, RolesAllowed.ADMIN, RolesAllowed.ROOT),
        ],
      },
      deleteOneBase: {
        decorators: [
          UseGuards(AuthGuard('jwt'), RolesGuard),
          Roles(RolesAllowed.ADMIN, RolesAllowed.ROOT),
        ],
      },
    },
    query: {
        join: {
          states: {
            eager: true,
          },
// If I want to get the people living in this country, then oncomment the next 3 lines:
//          persons: {
//            eager: true,
//          },
        },
      },
  })

@Controller('countries')
export class CountriesController {
    constructor(public service: CountriesService) {}
}
