import { IsMongoId, IsNumber } from "class-validator";

export class RatePostDto {
    @IsMongoId()
    postId: string;

    @IsNumber()
    rate:number;
}