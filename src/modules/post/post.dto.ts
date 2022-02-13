import { IsArray, IsMongoId, IsNumber, IsOptional, IsString, Length } from "@nestjs/class-validator";

export class PostCreateDto {
    @IsMongoId()
    @IsString()
    stateId: string;

    @IsString()
    @Length(3, 50)
    title: string;

    @IsString()
    @Length(3, 100)
    description: string;

    @IsString()
    @Length(10)
    text: string;
}

export type postCreateBody = {
    stateId: string;
    title: string;
    description: string;
    text: string;
    authorId: string;
}

export class PostUpdateDto {
    @IsMongoId()
    postId: string;

    @IsString()
    @Length(3, 50)
    @IsOptional()
    title: string;

    @IsString()
    @Length(3, 100)
    @IsOptional()
    description: string;

    @IsString()
    @Length(3, 30)
    @IsOptional()
    author: string;

    @IsString()
    @Length(10)
    @IsOptional()
    text: string;   
}

export class SeenPostDto {
    @IsMongoId()
    postId: string;
}

export class PostDeleteDto {
    @IsMongoId()
    postId: string;
}

export class PostRateDto {
    @IsMongoId()
    postId: string;

    @IsNumber()
    rate: number;
}