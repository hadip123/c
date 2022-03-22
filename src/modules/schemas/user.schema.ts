import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Post } from "./post.schema";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    lastName: string;

    @Prop({unique: true})
    username: string;

    @Prop()
    password: string;

    @Prop()
    admin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);