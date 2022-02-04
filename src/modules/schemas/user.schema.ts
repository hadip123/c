import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    lastName: string;

    @Prop()
    username: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);