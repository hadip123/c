import { IsMongoId } from "@nestjs/class-validator";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type CommentDocument = Comment & Document

@Schema()
export class Comment {
    @Prop({required: true})
    author: string;

    @Prop({required: true})
    text: string;

    @Prop({required: true})
    postId: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);