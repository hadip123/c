import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Post } from './post.schema';
import * as mongoose from 'mongoose'

export type StateDocument = State & Document

@Schema()
export class State {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    numberOfPosts: number;

    @Prop({required: true})
    averageOfRates: number;

    @Prop({required: true, type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]})
    posts: Post[];
}

export const StateSchema = SchemaFactory.createForClass(State);