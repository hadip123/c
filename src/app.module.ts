import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './modules/post/post.module';
import { StateModule } from './modules/state/state.module';
import { UsersModule } from './modules/users/users.module';
import { CommentModule } from './modules/comment/comment.module';
import { AuthModule } from './modules/auth/auth.module';
import { RateModule } from './modules/rate/rate.module';
import { CommunityModule } from './modules/community/community.module';
import { UtilitiesModule } from './modules/utilities/utilities.module';

@Module({
  imports: [RateModule,PostModule ,StateModule, MongooseModule.forRoot('mongodb://localhost:27017/kharazmi-app'), UsersModule, CommentModule, AuthModule, CommunityModule, UtilitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
