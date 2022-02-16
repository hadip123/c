import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isMongoId } from 'class-validator';
import { Model } from 'mongoose';
import { Rate, RateDocument } from '../schemas/rate.schema';

@Injectable()
export class RateService {
    constructor(@InjectModel(Rate.name) private readonly rateModel: Model<RateDocument>) { };

    async create(rate: number, ip: string, postId: string) {
        const peRate = await this.rateModel.findOne({ip, postId})
        if (peRate) {
            peRate.rate = rate;
            const result = await peRate.save();

            return result;
        }
        const result = await this.rateModel.create({
            ip,
            rate,
            postId
        });

        return result;
    }

    async getByIP(ip: string, postId: string) {
        if (!isMongoId(postId)) throw new HttpException('Post Not found', 304);
        const rate = await this.rateModel.findOne({ip, postId})

        if (!rate) throw new NotFoundException('Rate not found');

        return rate.rate;
    }
}