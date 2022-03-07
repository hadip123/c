import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isMongoId } from 'class-validator';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from '../schemas/comment.schema';
import { Post, PostDocument } from '../schemas/post.schema';
import { AddCommentDto } from './comment.dto';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument> ) {}

    async add(addComment: AddCommentDto, author: string) {
        const result = await this.commentModel.create({
            author,
            text: addComment.text,
            postId: addComment.postId
        });

        return result;
    }

    async getByPost(postId: string) {
        const validPostId = isMongoId(postId);
        if (!validPostId) throw new NotFoundException('Post not found..');
        const post = await this.postModel.findById(postId);
        if (!post) throw new NotFoundException('Post not found.');
        const result = await this.commentModel.find({postId});

        if (result.length === 0) throw new HttpException('No Comment', 203);
        
        return result;
    }
}
