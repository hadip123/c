import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, CommentSchema } from "../schemas/comment.schema";
import { Post, PostSchema } from "../schemas/post.schema";
import { Rate, RateSchema } from "../schemas/rate.schema";
import { State, StateSchema } from "../schemas/state.schema";
import { User, UserSchema } from "../schemas/user.schema";
import StateService from "../state/state.service";
import PostController from "./post.controller";
import PostService from "./post.service";

@Module({
    imports: [MongooseModule.forFeature([
        { name: State.name, schema: StateSchema }, 
        { name: Post.name, schema: PostSchema }, 
        { name: Comment.name, schema: CommentSchema }, 
        { name: User.name, schema: UserSchema }, 
        { name: Rate.name, schema: RateSchema }
    ])],
    controllers: [PostController],
    providers: [PostService, StateService]
})
export class PostModule { }  