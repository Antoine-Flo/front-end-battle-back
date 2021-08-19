import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChallengesModule } from './challenges/challenges.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ChallengesModule, UsersModule, MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@feb.gbbyi.mongodb.net/feb?retryWrites=true&w=majority`), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
