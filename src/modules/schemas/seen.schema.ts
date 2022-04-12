import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type SeenDocument = Seen & Document;

@Schema()
export class Seen {
	@Prop()
	postId: string;

	@Prop({ unique: true })
	ip: string;
}

export const SeenSchema = SchemaFactory.createForClass(Seen);