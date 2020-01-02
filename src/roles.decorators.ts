/**
 * Esto lo que hace es crear un decorador para que se pueda usar desde los controladores de la manera:
 * @Roles('admin') por ejemplo.
 */
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
