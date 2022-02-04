import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import { RegisterDto } from "./users.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {};

    async register(registerDto: RegisterDto) {
        const result = await this.userModel.create(registerDto);

        return result;
    }

    async findOne(username: string) {
        const result = await this.userModel.findOne({username});

        return result;
    }
}