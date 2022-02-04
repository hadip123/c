import { Module, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from '../schemas/comment.schema';
import { PostSchema } from '../schemas/post.schema';

@Module({
  providers: [CommentService],
  controllers: [CommentController],
  imports: [MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]), MongooseModule.forFeature([{name: Post.name,schema: PostSchema}])]
})
export class CommentModule {}