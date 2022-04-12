import { IsString, Length, IsMongoId } from '@nestjs/class-validator';

export class CreateCPostDto {
    @IsString()
    @Length(2, 90)
    title: string;

    @IsString()
    @IsMongoId()
    stateId: string;

    @IsString()
    @Length(4, 500)
    question: string;
}

export interface cPostCreate {
    title: string;
    authorId: string;
    stateId: string;
    question: string;
}

export class ReplyCPostDto {
    @IsString()
    @IsMongoId()
    communityPost: string;

    @IsString()
    @Length(4, 1000)
    reply: string;
}

export interface replyCreate {
    communityPost: string;
    author: string;
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

export interface editCPost {
    communityPostId: string;
    author: string;
    title: string;
    stateId: string;
    question: string;
}

export class EditCReplyDto {
    @IsMongoId()
    communityReplyId: string;

    @IsString()
    @Length(4, 1000)
    reply: string;
}

export interface editCReply {
    communityReplyId: string;
    author: string;
    reply: string;
}

export type FilterType = 'newest' | 'oldest';

export class DeleteCommunityPost {
    @IsMongoId()
    id: string;
}
export class DeleteCommunityPostReply {
    @IsMongoId()
    id: string;
}

export class Check {
    @IsMongoId()
    id: string;
}