import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IdType } from './idtype.entity';
import { IdTypesService } from './idtypes.service';
import { IdTypesController } from './idtypes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([IdType])],
  providers: [IdTypesService],
  controllers: [IdTypesController],
})
export class IdTypesModule {}
