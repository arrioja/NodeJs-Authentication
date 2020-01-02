import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { City } from './city.entity';
import { CitiesService } from './cities.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../roles.decorators';
import { RolesAllowed } from '../roles.obfuscation';

@Crud({
    model: {type: City},
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
          state: {
            eager: true,
          },
        },
      },
})
@Controller('cities')
export class CitiesController {
    constructor(public service: CitiesService) {}
}
