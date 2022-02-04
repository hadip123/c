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
    text: string;

    @Prop({required: true})
    seens: number;

    @Prop({required: true, type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]})
    comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);