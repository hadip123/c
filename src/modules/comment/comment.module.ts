import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from '../schemas/comment.schema';
import { Post, PostSchema } from '../schemas/post.schema';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}, {name: Post.name,schema: PostSchema}, {name: User.name, schema: UserSchema}])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}