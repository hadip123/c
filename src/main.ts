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
  const whitelist = [
    'http://localhost:8080', // IP: Pahlavan
  ];
  app.enableCors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {

        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))

      }
    },

    credentials: true,
  });

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
