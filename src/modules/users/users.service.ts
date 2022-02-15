import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import { RegisterDto } from "./users.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { };

    async register(registerDto: RegisterDto) {
        if (await this.userModel.findOne({ username: registerDto.username })) throw new HttpException('Username taken.', 402);
        const user = {
            username: registerDto.username,
            name: registerDto.name,
            lastName: registerDto.lastName,
            password: await bcrypt.hash(registerDto.password, 10),
            posts: []
        }
        const result = await this.userModel.create(user);

        return result;
    }

    async findOne(username: string) {
        const result = await this.userModel.findOne({ username });

        return result;
    }

    async updateInfo(id: string, name: string, lastName: string) {
        const result = await this.userModel.findOne({ id });
        if (!result) throw new NotFoundException('User not found.');

        result.name = name;
        result.lastName = lastName;

        return await result.save();
    }
}