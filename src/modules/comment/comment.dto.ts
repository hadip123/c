import { IsMongoId, IsString, Length } from "@nestjs/class-validator";

export class AddCommentDto {
    @IsString()
    @Length(2, 200)
    text: string;

    @IsMongoId()
    postId: string;
}