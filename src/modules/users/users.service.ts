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
            admin: false
        }
        const result = await this.userModel.create(user);

        return result;
    }

    async findOne(username: string) {
        console.log(`findOne called ${username}`);
        const result = await this.userModel.findOne({ username });
        console.log(result);

        return result;
    }

    async updateInfo(id: string, name: string, lastName: string) {
        console.log('updateInfo called');
        const result = await this.userModel.findOne({ id: id });
        if (!result) throw new NotFoundException('User not found.');

        result.name = name;
        result.lastName = lastName;

        return await result.save();
    }
    async findById (id: string) {
        console.log('findById called');
        
        const result = await this.userModel.findOne({_id: id});

        return result;
    }
}