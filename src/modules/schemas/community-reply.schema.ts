import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

export type CommunityReplyDocument = CommunityReply & Document;

@Schema()
export class CommunityReply {
    @Prop()
    communityPostId: string;
    
    @Prop()
    authorId: string;

    @Prop()
    reply: string;

    @Prop()
    createdDate: Date;
}

export const CommunityReplySchema = SchemaFactory.createForClass(CommunityReply);