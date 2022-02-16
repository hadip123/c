import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type RateDocument = Rate & Document;

@Schema()
export class Rate {
    @Prop()
    ip: string;

    @Prop()
    rate: number;

    @Prop()
    postId: string;
}

export const RateSchema = SchemaFactory.createForClass(Rate);