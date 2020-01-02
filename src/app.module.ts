import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { CountriesModule } from './countries/countries.module';
import { StatesModule } from './states/states.module';
import { CitiesModule } from './cities/cities.module';
import { IdTypesModule } from './idtypes/idtypes.module';
import { PersonsModule } from './persons/persons.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    CountriesModule,
    StatesModule,
    CitiesModule,
    IdTypesModule,
    PersonsModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
