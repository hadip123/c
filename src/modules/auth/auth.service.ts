import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
    constructor (private readonly usersService: UsersService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, username, ...rest } = user;
            return rest;
        }

        return null;
    }
}