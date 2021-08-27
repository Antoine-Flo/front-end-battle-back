import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { ChallengesModule } from './challenges/challenges.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ChallengesModule,
    UsersModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@feb.gbbyi.mongodb.net/feb?retryWrites=true&w=majority`,
    ),
    UsersModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
