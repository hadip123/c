import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isMongoId } from 'class-validator';
import { cPostCreate, replyCreate, editCPost, editCReply, FilterType } from './community.dto';
import { CommunityPost, CommunityPostDocument } from '../schemas/community-post.schema';
import { CommunityReply, CommunityReplyDocument } from '../schemas/community-reply.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { State, StateDocument } from '../schemas/state.schema';

@Injectable()
export class CommunityService {
	constructor(
		@InjectModel(CommunityPost.name) private cPostModel: Model<CommunityPostDocument>,
		@InjectModel(CommunityReply.name) private cReplyModel: Model<CommunityReplyDocument>,
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		@InjectModel(State.name) private stateModel: Model<StateDocument>,
	) { };

	async createCPost(data: cPostCreate) {
		const author = await this.userModel.findOne({ _id: data.authorId });
		if (!author) throw new NotFoundException('Author not found.');

		const result = await this.cPostModel.create({
			title: data.title,
			author: `${author.name} ${author.lastName}`,
			stateId: data.stateId,
			question: data.question,
			createdDate: new Date()
		});

		return result;
	}

	async createCReply(data: replyCreate) {
		const result = await this.cReplyModel.create({
			communityPostId: data.communityPost,
			authorId: data.author,
			reply: data.reply,
			createdDate: new Date()
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

	async getByState(stateId: string) {
		if (!isMongoId(stateId)) throw new NotFoundException('State not found.')

		const stateResult = await this.stateModel.findOne({ _id: stateId });
		if (!stateResult) throw new NotFoundException('State Not Found.');

		const result = await this.cPostModel.find({ stateId });

		return result;
	}

	async getAll(filterType: FilterType) {
		const result = await this.cPostModel.find();

		return result.sort((a: any, b: any) =>
			filterType === 'newest' ?
				b.createdDate - a.createdDate :
				a.createdDate - b.createdDate);
	}

	async getAnswears(cPostId: string) {
		const result = await this.cReplyModel.find({communityPostId: cPostId});
		
		return result;
	}

	async deleteCommunityPost(id: string) {
		const result = await this.cPostModel.deleteOne({_id: id});
		if (!result) throw new NotFoundException('Coummunity post not found');
		return result;
	}

	async deleteCommunityPostReply(id: string) {
		const result = await this.cReplyModel.deleteOne({_id: id});
		if (!result) throw new NotFoundException('Coummunity post reply not found');
		return result;
	}
}
