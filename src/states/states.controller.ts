import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { State } from './state.entity';
import { StatesService } from './states.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../roles.decorators';
import { RolesAllowed } from '../roles.obfuscation';

@Crud({
    model: {type: State},
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
          country: {
            eager: true,
          },
          cities: {
            eager: true,
          },

        },
      },
})
@Controller('states')
export class StatesController {
    constructor(public service: StatesService) {}
}
