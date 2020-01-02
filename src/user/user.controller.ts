import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../roles.decorators';
import { RolesGuard } from '../roles.guard';
import { RolesAllowed } from '../roles.obfuscation';

@Crud({
    model: {
      type: User,
    },
    query: {
      exclude: ['password', 'salt'],
      join: {
        person: {
          eager: true,
          allow: ['name', 'lastName', 'urlImage', 'email1', 'phone1'],
        },
      },
    },
    routes: {
      only: ['getOneBase', 'getManyBase', 'createOneBase', 'updateOneBase', 'deleteOneBase'],
      exclude: ['createManyBase', 'replaceOneBase'],
      updateOneBase: {
        decorators: [
          UseGuards(AuthGuard('jwt'), RolesGuard),
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

@Controller('user')
export class UserController {
    constructor(public service: UserService) {}
}
