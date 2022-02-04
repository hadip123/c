import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CommentDocument } from '../schemas/comment.schema';
import { PostDocument } from '../schemas/post.schema';
import { AddCommentDto } from './comment.dto';

@Injectable()
export class CommentService {
    constructor(private readonly commentModel: Model<CommentDocument>,
        private readonly postModel: Model<PostDocument> ) {}

    async add(addComment: AddCommentDto) {
        const result = await this.commentModel.create(addComment);
        const post = await this.postModel.findById(addComment.postId)

        if (post) {
            post.comments.push(result);
            post.save();
        }

        return result;
    }
}
