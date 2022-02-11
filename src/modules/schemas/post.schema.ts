import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'
import { Comment } from "./comment.schema";

export type PostDocument = Post & Document;

@Schema()
export class Post {
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    author: string;

    @Prop({required: true})
    rate: number;

    @Prop({required: true})
    text: string;

    @Prop({required: true})
    seens: number;

    @Prop({required: true})
    authorId: string;

    @Prop({required: true})
    stateId: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);