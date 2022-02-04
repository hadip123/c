import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post, PostDocument } from "../schemas/post.schema";
import { State, StateDocument } from "../schemas/state.schema";
import { PostCreateDto, SeenPostDto, PostUpdateDto } from "./post.dto";

@Injectable()
export default class PostService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>, @InjectModel(State.name) private stateModel: Model<StateDocument>) { }

    async create(post: PostCreateDto) {
        const state = await this.stateModel.findById(post.stateId);

        const postResult = await this.postModel.create({
            title: post.title,
            author: post.author,
            comments: post.comments,
            description: post.description,
            seens: post.seens,
            text: post.text
        })

        state.numberOfPosts = state.numberOfPosts + 1;

        state.posts.push(postResult);

        const result = await state.save();

        return result;
    }

    async delete(postId: string, stateId: string) { 
        const state = await this.stateModel.findById(stateId);
        const result = await this.postModel.findByIdAndDelete(postId);
        if (!result.errors) {
            state.numberOfPosts = state.numberOfPosts - 1;
            state.save();
        }
        return result;
    }

    async update(updatePost: PostUpdateDto) { 
        const result = await this.postModel.findByIdAndUpdate(updatePost.postId, {
            $set: {
                ...updatePost.title? {title: updatePost.title}: {},
                ...updatePost.author? {author: updatePost.author}: {},
                ...updatePost.text? {text: updatePost.text}: {},
                ...updatePost.description? {text: updatePost.description}: {},
            }
        });
        
        return result;
    }

    async seen(seenPost: SeenPostDto) {
        const result = await this.postModel.findById(seenPost.postId);

        result.seens = result.seens+1;

        return await result.save();
    }
}