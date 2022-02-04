import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, CommentSchema } from "../schemas/comment.schema";
import { Post, PostSchema } from "../schemas/post.schema";
import { State, StateSchema } from "../schemas/state.schema";
import StateService from "../state/state.service";
import PostController from "./post.controller";
import PostService from "./post.service";

@Module({
    imports: [MongooseModule.forFeature([{name: State.name,schema: StateSchema}]),MongooseModule.forFeature([{name: Comment.name,schema: CommentSchema}]),MongooseModule.forFeature([{name: Post.name,schema: PostSchema}])],
    controllers: [PostController],
    providers: [PostService, StateService]
})
export class PostModule {}  