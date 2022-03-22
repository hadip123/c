import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { cPostCreate, replyCreate, editCPost, editCReply } from './community.dto';
import { CommunityPost, CommunityPostDocument } from '../schemas/community-post.schema';
import { CommunityReply, CommunityReplyDocument } from '../schemas/community-reply.schema';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class CommunityService {
	constructor(
		@InjectModel(CommunityPost.name) private cPostModel: Model<CommunityPostDocument>,
		@InjectModel(CommunityReply.name) private cReplyModel: Model<CommunityReplyDocument>,
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) { };

	async createCPost(data: cPostCreate) {
		const author = await this.userModel.findOne({ _id: data.authorId });
		if (!author) throw new NotFoundException('Author not found.');

		const result = await this.cPostModel.create({
			title: data.title,
			author: `${author.name} ${author.lastName}`,
			stateId: data.stateId,
			question: data.question
		});

		return result;
	}

	async createCReply(data: replyCreate) {
		const result = await this.cReplyModel.create({
			communityPostId: data.communityPost,
			authorId: data.author,
			reply: data.reply
		});

		return result;
	}

	async editCPost(data: editCPost) {
		const result = await this.cPostModel.findOne({
			_id: data.communityPostId,
			author: data.author
		});

		if (!result) throw new NotFoundException('Community post not found.');

		result.title = data.title;
		result.stateId = data.stateId;
		result.question = data.question;

		return (await result.save());
	}

	async editCReply(data: editCReply) {
		const result = await this.cReplyModel.findOne({ 
			_id: data.communityReplyId,
			authorId: data.author
		});

		if (!result) throw new NotFoundException('Community reply not found.');

		result.reply = data.reply;

		return (await result.save());
	}
}
