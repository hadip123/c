import { Controller, Get, Post, Param, Body, UseGuards, Request, } from '@nestjs/common';
import { AuthenticatedGuard } from "../auth/authenticated.guard";
import { CommunityService } from './community.service';
import {
    FilterType,
    CreateCPostDto,
    EditCPostDto,
    ReplyCPostDto,
    EditCReplyDto,
    DeleteCommunityPost
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
    async getAnswearsByCommunityPost(@Param('cpId') communityPostId: string) {
        const result = await this.communityService.getAnswears(communityPostId);

        return {
            message: 'There are all answers for this question.',
            data: result
        };
    }

    @UseGuards(AuthenticatedGuard)
    @Post('create')
    async create(@Body() body: CreateCPostDto, @Request() req) {
        const result = await this.communityService.createCPost({
            authorId: req.user['_doc']['id'],
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
            author: req.user['_doc']['id'],
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
    async deleteCommunityPost(@Body() body: DeleteCommunityPost) {
        const result = await this.communityService.deleteCommunityPost(body.id);

        return {
            message: 'Deleted',
            data: result
        }
    }
}