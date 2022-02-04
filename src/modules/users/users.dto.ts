import { IsAlphanumeric, IsString, Length } from "@nestjs/class-validator";

export class RegisterDto {
    @IsString()
    @IsAlphanumeric()
    username: string;

    @IsString()
    @Length(8, 16)
    password: string;

    @IsString()
    @Length(2, 30)
    name: string;

    @IsString()
    @Length(2, 30)
    lastName: string;
}