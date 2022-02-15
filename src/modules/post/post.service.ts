import { Injectable, NotFoundException, HttpException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isMongoId } from "class-validator";
import { Model } from "mongoose";
import { Post, PostDocument } from "../schemas/post.schema";
import { State, StateDocument } from "../schemas/state.schema";
import { UserDocument, User } from "../schemas/user.schema";
import { PostCreateDto, SeenPostDto, PostUpdateDto, postCreateBody, PostRateDto } from "./post.dto";

@Injectable()
export default class PostService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>, @InjectModel(State.name) private stateModel: Model<StateDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(post: postCreateBody, req) {
        const state = await this.stateModel.findById(post.stateId);
        const author = await this.userModel.findOne({id: post.authorId});

        if (!author) throw new NotFoundException('کاربر یافت نشد');
        if (!state) throw new NotFoundException('استان یافت نشد');

        const postResult = await this.postModel.create({
            title: post.title,
            author: `${author.name} ${author.lastName}`,
            description: post.description,
            seens: [],
            text: post.text,
            rate: [],
            stateId: post.stateId,
            authorId: post.authorId
        })

        return postResult;
    }

    async delete(postId: string, authorId:string) {
        const result = await this.postModel.findOneAndDelete({
            id: postId,
            authorId
        });

        if (!result) throw new NotFoundException('Post Not found')
        
        return result;
    }

    async update(updatePost: PostUpdateDto, authorId: string) {
        const result = await this.postModel.findOne({
            id: updatePost.postId, authorId}, {
        });
        
        if (!result) throw new NotFoundException('Post Not found')

        result.updateOne({
            $set: {
                ...updatePost.title ? { title: updatePost.title } : {},
                ...updatePost.author ? { author: updatePost.author } : {},
                ...updatePost.text ? { text: updatePost.text } : {},
                ...updatePost.description ? { text: updatePost.description } : {},
            }
        })

        return result;
    }

    async seen(seenPost: SeenPostDto, ip: string) {
        const result = await this.postModel.findById(seenPost.postId);
        if (!result) throw new NotFoundException('Post not found');
        result.seens.push({ip: ip});

        return await result.save();
    }

    async rate(ratePost: PostRateDto, ip: string) {
        const result = await this.postModel.findById(ratePost.postId);

        if (!result) throw new NotFoundException('Post not found');
        const perviousRate = result.rates.find((rate) => rate.ip === ip);
        if (perviousRate) {
            perviousRate.rate = ratePost.rate;
        
            return await result.save();
        };
        result.rates.push({ip, rate: ratePost.rate});
        
        return await result.save();
    }

    async getRate(postId: string, userIP: string) {
        let valid = isMongoId(postId);
        if (!valid) throw new NotFoundException('Post Not found.');
        const post = await this.postModel.findById(postId);
        if (!post) throw new NotFoundException('Post not found')
        const rate = post.rates.find(({ip}) => ip = userIP);
        if (!rate) throw new HttpException('Rate not found', 202)
        
        return rate.rate;
    }

    async getAll() {
        const result = await this.postModel.find();

        return result;
    }

    async getByState(stateId: string) {
        const result = await this.postModel.find({
            stateId
        });

        return result;
    }

    async getById(id: string) {
        const result = await this.postModel.findById(id);
        if (!result) throw new NotFoundException('نوشته یافت نشد');
        let post = {...result['_doc']};
        let aRates = 0;
        post.rates.map(rate => {
            aRates += rate.rate;
        }); 
        let aSeens = 0;
        post['seen'] = post.seens.length;
        post['rate'] = (aRates / post.rates.length) ? (aRates / post.rates.length) : 0;
        delete post['__v']
        delete post['rates'];
        delete post['seens'];
        return post;
    }

    async getByAuthor(authorId: string) {
        const result = await this.postModel.find({
            authorId
        })

        return result;
    }
}