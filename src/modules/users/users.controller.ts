import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { RegisterDto } from "./users.dto";
import { UsersService } from "./users.service";

@Controller('user')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        const result = await this.userService.register(body)

        return {
            message: 'User Created.',
            data: result
        }
    }

    @Get('info/get')
    async getInfo(@Request() req) {
        return {
            message: 'There is user info.',
            data: req.user
        }
    }
}