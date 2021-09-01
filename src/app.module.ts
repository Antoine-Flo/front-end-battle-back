import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt'

import { AppService } from './app.service';
import { ChallengesModule } from './challenges/challenges.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.IS_PUBLIC_KEY }),
    HttpModule,
    ConfigModule.forRoot(),
    ChallengesModule,
    UsersModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@feb.gbbyi.mongodb.net/feb?retryWrites=true&w=majority`,
    ),
    UsersModule,
  ],
  controllers: [],
  providers: [AppService,   {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
})
export class AppModule {}
