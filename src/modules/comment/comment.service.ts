import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isMongoId } from 'class-validator';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from '../schemas/comment.schema';
import { Post, PostDocument } from '../schemas/post.schema';
import { AddCommentDto, filterType } from './comment.dto';
import { UserDocument, User } from '../schemas/user.schema';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
        @InjectModel(Post.name) private readonly postModel: Model<PostDocument>, @InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async add(addComment: AddCommentDto, author: string) {
        const user = await this.userModel.findOne({ _id: author });

        if (!user) throw new NotFoundException('User Not found');
        const result = await this.commentModel.create({
            author: `${user.name} ${user.lastName}`,
            checked: false,
            text: addComment.text,
            postId: addComment.postId,
            createdDate: new Date()
        });

        return result;
    }

    async getByPost(postId: string) {
        const validPostId = isMongoId(postId);
        if (!validPostId) throw new NotFoundException('Post not found..');
        const post = await this.postModel.findById(postId);
        if (!post) throw new NotFoundException('Post not found.');
        const result = await this.commentModel.find({ postId });

        if (result.length === 0) throw new HttpException('No Comment', 203);

        return await Promise.all(result.map(async comment => {
            const user = await this.userModel.findOne({ id: comment.author });
            let authorName: string;
            if (!user) authorName = 'نویسنده پاک شده';
            else authorName = `${user.name} ${user.lastName}`;

            comment['authorName'] = authorName;

            return comment;
        }));
    }

    async all(filter: filterType) {
        const result = await this.commentModel.find();

        const oldest = (await Promise.all(result.map(async comment => {
            const user = await this.userModel.findOne({ id: comment.author });
            let authorName: string;
            if (!user) authorName = 'نویسنده پاک شده';
            else authorName = `${user.name} ${user.lastName}`;

            comment['authorName'] = authorName;

            return comment;
        }))).sort((a: any, b: any) => a.createdDate - b.createdDate);

        const newest = oldest.reverse()
        return filter === 'newest' ? newest : oldest;
    }

    async delete(commentId: string, admin: boolean) {
        if (!isMongoId(commentId)) throw new NotFoundException('Comment not found.');
        if (!admin) throw new HttpException('You dont have permissions', 205);

        const result = await this.commentModel.findOneAndDelete({ _id: commentId });
        if (!result) throw new NotFoundException('Comment not found.');

        return result;
    }

    async check(postId: string, admin: boolean = false) {
        if (!admin) throw new HttpException('You dont have permissions', 205);

        const result = await this.commentModel.updateOne({ id: postId }, {
            $set: {
                checked: true,
            }
        });

        if (!result) throw new NotFoundException('Comment not found!')

        return result;
    }
}
