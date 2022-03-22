import { Injectable, NotFoundException, HttpException, ForbiddenException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isMongoId } from "class-validator";
import { Model } from "mongoose";
import { Post, PostDocument } from "../schemas/post.schema";
import { Rate, RateDocument } from "../schemas/rate.schema";
import { State, StateDocument } from "../schemas/state.schema";
import { UserDocument, User } from "../schemas/user.schema";
import { PostCreateDto, SeenPostDto, PostUpdateDto, postCreateBody, PostRateDto, SORT_MODE, DATE_CREATED } from "./post.dto";

@Injectable()
export default class PostService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>, @InjectModel(State.name) private stateModel: Model<StateDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>, @InjectModel(Rate.name) private readonly rateModel: Model<RateDocument>) { }

    async create(post: postCreateBody, req) {
        const state = await this.stateModel.findById(post.stateId);

        if (!state) throw new NotFoundException('استان یافت نشد');

        const postResult = await this.postModel.create({
            title: post.title,
            author: post.author,
            description: post.description,
            seens: [],
            text: post.text,
            rate: [],
            stateId: post.stateId,
            authorId: post.authorId,
            createdDate: new Date(),
            checked: false
        })

        return postResult;
    }

    async delete(postId: string, authorId: string, admin: boolean) {
        if (!admin) throw new HttpException('You dont have permissions', 205);
        const result = await this.postModel.findOne({
            _id: postId,
        });

        if (!result) throw new NotFoundException('Post Not found')

        return await result.delete();

    }

    async update(updatePost: PostUpdateDto, authorId: string) {
        const result = await this.postModel.findOne({
            id: updatePost.postId, authorId
        }, {
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
        result.seens.push({ ip: ip });

        return await result.save();
    }

    async getAll() {
        const result = await this.postModel.find();

        return (await Promise.all(result.map(async (post) => {
            const state = await this.stateModel.findOne({ _id: post.stateId });
            const rates = await this.rateModel.find({ postId: post.id });
            let aRates = 0;
            rates.map(rate => {
                aRates += rate.rate;
            });
            const rate = aRates / rates.length;
            return {
                ...post['_doc'],
                rate: (`${rate}`.slice(0, 4)) === 'NaN' ? 0 : (`${rate}`.slice(0, 4)),
                stateName: state.name
            }
        }))).sort((a: any, b: any) => b.createdDate - a.createdDate);
    }

    async getByState(stateId: string) {
        const result = await this.postModel.find({
            stateId
        });

        return await Promise.all(result.map(async (post) => {
            const rates = await this.rateModel.find({ postId: post.id });
            const state = await this.stateModel.findOne({ _id: post.stateId });
            let aRates = 0;
            rates.map(rate => {
                aRates += rate.rate;
            });
            const rate = aRates / rates.length;
            return {
                ...post['_doc'],
                rate: (`${rate}`.slice(0, 4)) === 'NaN' ? 0 : (`${rate}`.slice(0, 4)),
                stateName: state.name
            }
        }));
    }

    async getById(id: string) {
        const result = await this.postModel.findById(id);
        if (!result) throw new NotFoundException('نوشته یافت نشد');
        let post = { ...result['_doc'] };
        let aRates = 0;
        const rates = await this.rateModel.find({ postId: id });
        rates.map(rate => {
            aRates += rate.rate;
        });
        let aSeens = 0;
        post['seen'] = post.seens.length;
        post['rate'] = (aRates / rates.length) ? (aRates / rates.length) : 0;
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

    async getBestPosts() {
        return (await this.getAll()).sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate))
    }

    async getTodayPosts(sortMode: SORT_MODE, dateCreated: DATE_CREATED) {

        // date created mode
        if (dateCreated === 'day') {

        } else if (dateCreated === 'week') {

        } else if (dateCreated === 'month') {

        } else if (dateCreated === 'year') {

        }


    }

    async checkPost(postId: string, admin: boolean) {
        if (!admin) throw new ForbiddenException('only admin can delete post');
        const result = await this.postModel.findOne({
            _id: postId,
        });

        if (!result) throw new NotFoundException('Post Not found')

        result.checked = true;

        return await result.save();
    }
}