import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationErrorFilter } from './validation-error.filter';
import * as admin from 'firebase-admin';
import * as helmet from 'helmet';

import { ServiceAccount } from 'firebase-admin';

const adminConfig: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

const config = new DocumentBuilder()
  .setTitle('Front-End Battle')
  .setDescription('The FEB API description')
  .setVersion('1.0')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.useGlobalFilters(new ValidationErrorFilter());

  // admin.initializeApp({
  //   credential: admin.credential.cert(adminConfig),
  // });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
