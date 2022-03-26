import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';
import { CommunityPost, CommunityPostSchema } from '../schemas/community-post.schema';
import { CommunityReply, CommunityReplySchema } from '../schemas/community-reply.schema';
import { User,UserSchema } from '../schemas/user.schema';
import { State, StateSchema } from '../schemas/state.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: CommunityPost.name, schema: CommunityPostSchema },
    { name: CommunityReply.name, schema: CommunityReplySchema },
    { name: User.name, schema: UserSchema },  
    { name: State.name, schema: StateSchema }
  ])],
  controllers: [CommunityController],
  providers: [CommunityService],
})
export class CommunityModule { }
  