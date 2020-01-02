import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { IdType } from './idtype.entity';
import { IdTypesService } from './idtypes.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../roles.decorators';
import { RolesAllowed } from '../roles.obfuscation';

@Crud({
    model: {type: IdType},
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
})
@Controller('idtypes')
export class IdTypesController {
    constructor(public service: IdTypesService) {}
}
