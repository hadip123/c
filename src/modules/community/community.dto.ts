import { IsString, Length, IsMongoId } from '@nestjs/class-validator';

export class CreateCPostDto {
    @IsString()
    @Length(2, 30)
    title: string;

    @IsString()
    @IsMongoId()
    authorId: string;

    @IsString()
    @IsMongoId()
    stateId: string;

    @IsString()
    @Length(4, 500)
    question: string;
}

export class ReplyCPostDto {
    @IsString()
    @IsMongoId()
    communityPost: string;

    @IsString()
    @IsMongoId()
    author: string;

    @IsString()
    @Length(4, 1000)
    reply: string;
}

export class EditCPostDto {
    @IsMongoId()
    communityPostId: string;

    @IsString()
    @Length(2, 30)
    title: string;

    @IsString()
    @IsMongoId()
    stateId: string;

    @IsString()
    @Length(4, 500)
    question: string;
}

export class EditCReplyDto {
    @IsMongoId()
    communityReplyId: string;

    @IsString()
    @IsMongoId()
    communityPost: string;

    @IsString()
    @Length(4, 1000)
    reply: string;
}