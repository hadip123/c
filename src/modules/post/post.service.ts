import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post, PostDocument } from "../schemas/post.schema";
import { State, StateDocument } from "../schemas/state.schema";
import { UserDocument } from "../schemas/user.schema";
import { PostCreateDto, SeenPostDto, PostUpdateDto, postCreateBody } from "./post.dto";

@Injectable()
export default class PostService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>, @InjectModel(State.name) private stateModel: Model<StateDocument>, @InjectModel(State.name) private userModel: Model<UserDocument>) { }

    async create(post: postCreateBody, req) {
        const state = await this.stateModel.findById(post.stateId);
        const author = await this.userModel.findOne({id: post.authorId});
        
        if (!author) throw new NotFoundException('User Not Found.');
        if (!state) throw new NotFoundException('State Not Found.');

        const postResult = await this.postModel.create({
            title: post.title,
            author: `${author.name} ${author.lastName}`,
            description: post.description,
            seens: post.seens,
            text: post.text,
            rate: post.rate,
            stateId: post.stateId,
            authorId: post.authorId
        })

        return postResult;
    }

    async delete(postId: string, authorId:string) {
        const result = await this.postModel.findOneAndDelete({
            id: postId,
            authorId
        });

        if (!result) throw new NotFoundException('Post Not found')
        
        return result;
    }

    async update(updatePost: PostUpdateDto, authorId: string) {
        const result = await this.postModel.findOne({
            id: updatePost.postId, authorId}, {
        });
        
        if (!result) throw new NotFoundException('Post Not found')

        result.updateOne({
            $set: {
                ...updatePost.title ? { title: updatePost.title } : {},
                ...updatePost.author ? { author: updatePost.author } : {},
                ...updatePost.text ? { text: updatePost.text } : {},
                ...updatePost.description ? { text: updatePost.description } : {},
            }
        })

        return result;
    }

    async seen(seenPost: SeenPostDto) {
        const result = await this.postModel.findById(seenPost.postId);
        result.seens = result.seens + 1;

        return await result.save();
    }

    async getAll() {
        const result = await this.postModel.find();

        return result;
    }

    async getByState(stateId: string) {
        const result = await this.postModel.find({
            stateId
        });

        return result;
    }

    async getById(id: string) {
        const result = await this.postModel.findById(id);

        return result;
    }

    async getByAuthor(authorId: string) {
        const result = await this.postModel.find({
            authorId
        })

        return result;
    }
}