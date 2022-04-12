import { Controller, Get, Post, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthenticatedGuard } from "../auth/authenticated.guard";
import { CommunityService } from './community.service';
import {
    FilterType,
    CreateCPostDto,
    EditCPostDto,
    ReplyCPostDto,
    EditCReplyDto,
    DeleteCommunityPost,
    DeleteCommunityPostReply,
    Check
} from './community.dto';

@Controller('community')
export class CommunityController {
    constructor(private readonly communityService: CommunityService) { };

    @Get('state/:id')
    async getAllByState(@Param('id') stateId: string) {
        const response = await this.communityService.getByState(stateId);

        return {
            message: 'There are all community posts by state.',
            data: response
        }
    }

    
    @Get(':filterType')
    async getAll(@Param('filterType') filter: FilterType) {
        const result = await this.communityService.getAll(filter);

        return {
            message: 'There are all community posts.',
            data: result
        }
    }

    @Get('answers/:cpId')
    async getAnswersByCommunityPost(@Param('cpId') communityPostId: string) {
        const result = await this.communityService.getAnswers(communityPostId);

        return {
            message: 'There are all answers for this question.',
            data: result
        };
    }

    @UseGuards(AuthenticatedGuard)
    @Post('create')
    async create(@Body() body: CreateCPostDto, @Request() req) {
        const result = await this.communityService.createCPost({
            authorId: req.user['_doc']['_id'],
            question: body.question,
            stateId: body.stateId,
            title: body.title
        });

        return {
            message: 'Success',
            data: result
        };
    }

    @UseGuards(AuthenticatedGuard)
    @Post('edit')
    async editCPost(@Body() body: EditCPostDto, @Request() req) {
        const result = await this.communityService.editCPost({
            author: req.user['_doc']['_id'],
            communityPostId: body.communityPostId,
            question: body.question,
            stateId: body.stateId,
            title: body.title
        });

        return {
            message: 'Updated',
            data: result
        }
    }

    @UseGuards(AuthenticatedGuard)
    @Post('reply/create')
    async createCReply(@Body() body: ReplyCPostDto, @Request() req) {
        const result = await this.communityService.createCReply({
            author: req.user['_doc']['id'],
            communityPost: body.communityPost,
            reply: body.reply
        });

        return {
            message: 'Answered!',
            data: result
        }
    }

    @UseGuards(AuthenticatedGuard)
    @Post('reply/edit')
    async editCReply(@Body() body: EditCReplyDto, @Request() req) {
        const result = await this.communityService.editCReply({
            author: req.user['_doc']['id'],
            communityReplyId: body.communityReplyId,
            reply: body.reply
        });

        return {
            message: 'Updated',
            data: result
        }
    }

    @UseGuards(AuthenticatedGuard)
    @Post('delete')
    async deleteCommunityPost(@Body() body: DeleteCommunityPost, @Request() req) {
        const result = await this.communityService.deleteCommunityPost(body.id, req.user['_doc']['admin']);

        return {
            message: 'Deleted',
            data: result
        }
    }

    @UseGuards(AuthenticatedGuard)
    @Post('answer/delete')
    async deleteCommunityPostReply(@Body() body: DeleteCommunityPostReply, @Request() req) {
        const result = await this.communityService.deleteCommunityPostReply(body.id, req.user['_doc']['admin']);

        return {
            message: 'Deleted',
            data: result
        }
    }

    @Get('posts/today')
    async todayPostsCount() {
        const result = await this.communityService.postsCountToday();

        return {
            message: 'Posts Count',
            data: result
        }
    }

    @Get('reply/today')
    async todayAnswersCount() {
        const result = await this.communityService.answersCountToday();

        return {
            message: 'answers Count',
            data: result
        }
    }

    @Get('answers/:filterType/get')
    async getanswers(@Param('filterType') filterType: FilterType) {
        const result = await this.communityService.getAllAnswers(filterType);

        return {
            message: 'All answers',
            data: result
        }
    }

    @UseGuards(AuthenticatedGuard)
    @Post('check')
    async checkQuestion(@Body() body: Check, @Request() req) {
        const result = await this.communityService.checkQuestion(body.id, req.user['_doc']['admin']);

        return {
            message: 'Question Checked',
            data: result
        }
    }

    @UseGuards(AuthenticatedGuard)
    @Post('answer/check')
    async checkanswer(@Body() body: Check, @Request() req) {
        const result = await this.communityService.checkAnswer(body.id, req.user['_doc']['admin']);
        
        return {
            message: 'Question Cheecked',
            data: result
        }
    }
}