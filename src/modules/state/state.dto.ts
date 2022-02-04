import { IsMongoId, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";

export class UpdateStateDto {
    @IsMongoId()
    id: string;

    @IsNumber()
    @IsOptional()
    numberOfPosts: number;

    @IsNumber()
    @IsOptional()
    averageOfRates: number;
}