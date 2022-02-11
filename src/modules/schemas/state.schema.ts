import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Post } from './post.schema';
import * as mongoose from 'mongoose'

export type StateDocument = State & Document

@Schema()
export class State {
    @Prop({required: true})
    name: string;
}

export const StateSchema = SchemaFactory.createForClass(State);