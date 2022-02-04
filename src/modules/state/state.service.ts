import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { State, StateDocument } from "../schemas/state.schema";
import { UpdateStateDto } from "./state.dto";

@Injectable()
export default class StateService {
    constructor(@InjectModel(State.name) private stateModel: Model<StateDocument>) { };

    async find() {
        const mongo_states = await this.stateModel.find().exec();

        let states = [];

        mongo_states.map((state) => {
            states.push({
                id: state.id,
                name: state.name,
                rates: state.averageOfRates,
                posts: state.numberOfPosts
            });
        })
        return states;
    }

    async update(updateStateDto: UpdateStateDto) {
        return await this.stateModel.updateOne({ id: updateStateDto.id }, {
            $set: {
                ...updateStateDto.averageOfRates ? { averageOfRates: updateStateDto.averageOfRates } : {},
                ...updateStateDto.numberOfPosts ? { numberOfPosts: updateStateDto.numberOfPosts } : {},
            }
        })
    }

    async create(name: string) {
        return await this.stateModel.create({
            name: name,
            numberOfPosts: 0,
            averageOfRates: 0
        });
    }
}

