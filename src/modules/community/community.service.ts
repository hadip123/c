import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCPostDto, ReplyCPostDto, EditCPostDto, EditCReplyDto } from './community.dto';
import { CommunityPost, CommunityPostDocument } from '../schemas/community-post.schema';
import { CommunityReply, CommunityReplyDocument } from '../schemas/community-reply.schema';

@Injectable()
export class CommunityService {
	constructor(
		@InjectModel(CommunityPost.name) private cPostModel: Model<CommunityPostDocument>,
		@InjectModel(CommunityReply.name) private cReplyModel: Model<CommunityReplyDocument>,
	) { };

	async createCPost(data: CreateCPostDto) {
		const result = await this.cPostModel.create({
			title: data.title,
			author: data.authorId,
			stateId: data.stateId,
			question: data.question
		});

		return result;
	}

	async createCReply(data: ReplyCPostDto) {
		const result = await this.cReplyModel.create({
			communityPostId: data.communityPost,
			authorId: data.author,
			reply: data.reply
		});

		return result;
	}

	async editCPost(data: EditCPostDto) {
		const result = await this.cPostModel.findOne({_id: data.communityPostId});

		if (!result) throw new NotFoundException('Community post not found.');

		result.title = data.title;
		result.stateId = data.stateId;
		result.question = data.question;

		return (await result.save());
	}

	async 
}
