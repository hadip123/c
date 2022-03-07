import { Body, Controller, Get, Post, Req, Request, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "../auth/authenticated.guard";
import { RegisterDto, UserUpdateDto } from "./users.dto";
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

    @UseGuards(AuthenticatedGuard)
    @Get('info/get')
    async getInfo(@Request() req) {
        const result = await this.userService.findById(req.user['_doc']['_id']);
        return {
            message: 'There is user info.',
            data: {
                id: result.id,
                username: result.username,
                name: result.name,
                lastName: result.lastName,
            }
        }
    }

    @UseGuards(AuthenticatedGuard)
    @Post('info/update')
    async updateInfo(@Request() req, @Body() body: UserUpdateDto) {
        const result = await this.userService.updateInfo(req.user['_doc']['_id'], body.name, body.lastName);

        return {
            message: 'User updated.',
            data: result
        }
    }
}