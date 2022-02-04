import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import { RegisterDto } from "./users.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {};

    async register(registerDto: RegisterDto) {
        const user = {
            username: registerDto.username,
            name: registerDto.name,
            lastName: registerDto.lastName,
            password: await bcrypt.hash(registerDto.password, 10)
        }
        const result = await this.userModel.create(user);

        return result;
    }

    async findOne(username: string) {
        const result = await this.userModel.findOne({username});

        return result;
    }
}