import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as passport from 'passport';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  // make sure to look in express-session doc
  app.use(session({
    secret: 'rostamzhoon',
    resave: false,
    saveUninitialized: false,
    // cookie: {maxAge: 36000}
  }))
  app.enableCors();

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
