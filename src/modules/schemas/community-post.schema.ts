import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

export type CommunityPostDocument = CommunityPost & Document;

@Schema()
export class CommunityPost {
    @Prop()
    title: string;
    
    @Prop()
    author: string;
    
    @Prop()
    stateId: string;
    
    @Prop()
    question: string;

    @Prop()
    createdDate: Date;

    @Prop()
    checked: boolean;
}

export const CommunityPostSchema = SchemaFactory.createForClass(CommunityPost);