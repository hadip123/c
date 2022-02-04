import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from '../schemas/comment.schema';
import { Post, PostSchema } from '../schemas/post.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}, {name: Post.name,schema: PostSchema}])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}