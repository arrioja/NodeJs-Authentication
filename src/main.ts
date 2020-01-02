import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');

  // This allows this API to be consumed from other locations with different IPs
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors();
    logger.log('Accepting request from all origins');
  }

// If the post is provided using the console, then this one is used
// otherwise, serverconfig is used. To send the port with the console, use: PORT=3005 npm run start:dev
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application initiated on port ${port}`);
}
bootstrap();
