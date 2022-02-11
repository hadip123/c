import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from '../schemas/comment.schema';
import { Post, PostDocument } from '../schemas/post.schema';
import { AddCommentDto } from './comment.dto';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument> ) {}

    async add(addComment: AddCommentDto) {
        const result = await this.commentModel.create(addComment);

        return result;
    }
}
