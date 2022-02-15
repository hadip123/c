import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isMongoId } from "class-validator";
import { stat } from "fs";
import { Model } from "mongoose";
import { Post, PostDocument } from "../schemas/post.schema";
import { State, StateDocument } from "../schemas/state.schema";

@Injectable()
export default class StateService {
    constructor(@InjectModel(State.name) private stateModel: Model<StateDocument>, @InjectModel(Post.name) private postModel: Model<PostDocument>) { };

    async find() {
        const mongo_states = await this.stateModel.find().exec();

        let states: any[] = await Promise.all(mongo_states.map(async (state) => {
            let aRates = 0;
            const posts = await this.postModel.find({
                stateId: state.id
            });
            if (posts.length !== 0) {
                posts.map(post => {
                    let bRates: number = 0;
                    post.rates.map((rate) => {
                        bRates += rate.rate;
                    })
                    aRates += (bRates / post.rates.length);
                });
            }

            return {
                id: state.id,
                name: state.name,
                numberOfPosts: posts.length,
                averageOfRates: (aRates) ? (aRates / posts.length) : 0,
            }
        }));

        if (states.length === 0) throw new InternalServerErrorException()

        return states.sort((a, b) => b.averageOfRates - a.averageOfRates);
    }

    async create(name: string) {
        return await this.stateModel.create({
            name: name,
        });
    }
    async getStateName(id: string) {
        const validId = isMongoId(id);
        if (!validId) throw new NotFoundException('State not found');
        const result = await this.stateModel.find({_id: id});
        if (!result[0]) throw new NotFoundException('State not found.');
        return result[0]
    }
}

