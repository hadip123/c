import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
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
		const today = new Date()
		const result = await this.cPostModel.create({
			title: data.title,
			author: author.id,
			stateId: data.stateId,
			question: data.question,
			createdDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
			checked: false,
		});

		return result;
	}

	async createCReply(data: replyCreate) {
		const today = new Date()
		const result = await this.cReplyModel.create({
			communityPostId: data.communityPost,
			authorId: data.author,
			reply: data.reply,
			createdDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
			checked: false,
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
		const oldest = (await Promise.all(result.map(async (question) => {
			const user = await this.userModel.findOne({ id: question.author });
			return {
				_id: question.id,
				title: question.title,
				authorId: question.author,
				author: `${user.name} ${user.lastName}`,
				createdDate: question.createdDate,
				stateId: question.stateId,
				question: question.question,
				checked: question.checked,
			}
		}))).sort((a: any, b: any) => a.createdDate - b.createdDate);
		const newest = oldest.reverse()
		return filterType === 'newest' ? newest : oldest;
	}

	async getAnswers(cPostId: string) {
		const result = await this.cReplyModel.find({ communityPostId: cPostId });

		const oldest = result.sort((a: any, b: any) => a.createdDate - b.createdDate);
		const newest = oldest.reverse();
		return newest;
	}

	async deleteCommunityPost(id: string, admin: boolean) {
		if (!admin) throw new HttpException('You dont have permissions', 205)

		const result = await this.cPostModel.deleteOne({ _id: id });
		if (!result) throw new NotFoundException('Coummunity post not found');
		return result;
	}

	async deleteCommunityPostReply(id: string, admin: boolean) {
		if (!admin) throw new HttpException('You dont have permissions', 205)

		const result = await this.cReplyModel.deleteOne({ _id: id });
		if (!result) throw new NotFoundException('Coummunity post reply not found');
		return result;
	}

	async postsCountToday() {
		const date = new Date();
		const today = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate() + 1, date.getHours() + 8);
		const yesterday = new Date(today);
		yesterday.setDate(today.getDate() - 1);
		const result = await this.cPostModel.find({
			createdDate: {
				$lt: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`,
				$gte: `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`,
			}
		});



		return result.length;
	}
	async answersCountToday() {
		const date = new Date();
		const today = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate() + 1, date.getHours() + 8);
		const yesterday = new Date(today);
		yesterday.setDate(today.getDate() - 1);
		const result = await this.cReplyModel.find({
			createdDate: {
				$lt: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`,
				$gte: `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`,
			}
		});


		return result.length;
	}


	async getAllAnswers(filterType: FilterType) {
		const result = await this.cReplyModel.find();

		const oldest = (await Promise.all(result.map(async (answer) => {
			const user = await this.userModel.findOne({ id: answer.authorId });
			return {
				_id: answer.id,
				communityPostId: answer.communityPostId,
				authorId: answer.authorId,
				author: `${user.name} ${user.lastName}`,
				createdDate: answer.createdDate,
				reply: answer.reply,
				checked: answer.checked,
			}
		}))).sort((a: any, b: any) => a.createdDate - b.createdDate);
		const newest = oldest.reverse()
		return filterType === 'newest' ? newest : oldest;
	}

	async checkAnswer(id: string, admin: boolean) {
		if (!admin) throw new HttpException('You dont have permissions', 205)
		const result = await this.cReplyModel.updateOne({ _id: id }, { $set: { checked: true } });

		if (!result) throw new NotFoundException('Answer not found');

		return result;
	}

	async checkQuestion(id: string, admin: boolean) {
		if (!admin) throw new HttpException('You dont have permissions', 205)
		const result = await this.cPostModel.updateOne({ _id: id }, { $set: { checked: true } });

		if (!result) throw new NotFoundException('Community Post not found');

		return result;
	}
}
