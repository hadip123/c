import { IsAlphanumeric, IsNumberString, IsString, Length, Matches } from "@nestjs/class-validator";

export class RegisterDto {
    @IsString()
    @Length(5, 30, {
        message: 'نام کاربری باید بین 5 و 30 حرف باشد'
    })
    @Matches(/^[A-Za-z][A-Za-z0-9_]{5,30}$/, {
        message: 'نام کاربری باید از حروف و اعداد تشکیل شده باشد'
    })
    username: string;

    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/, {
        message: ' رمز عبور باید از حروف و اعداد تشکیل شده باشد',
    })
    @Length(8, 16, {
        message: 'رمز عبور باید بین ۸ و ۱۶ حرف باشد'
    })
    password: string;

    @IsString()
    @Length(2, 30, {
        message: 'نام باید بین ۲ و ۳۰ حرف باشد'
    })
    name: string;

    @IsString()
    @Length(2, 30, {
        message: 'نام خانوادگی باید بین ۲ و ۳۰ حرف باشد'
    })
    lastName: string;
}