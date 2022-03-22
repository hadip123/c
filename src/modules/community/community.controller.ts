import { Controller, Get, Post, Param, Body, Request } from '@nestjs/common';
import { CommunityService } from './community.service';
import {
    FilterType,
    CreateCPostDto,
    EditCPostDto,
    ReplyCPostDto,
    EditCReplyDto
} from './community.dto';

@Controller('community')
export class CommunityController {
    constructor(private readonly communityService: CommunityService) { };

    @Get('state/:id')
    async getAllByState(@Param('id') stateId: string) { }

    @Get(':filterType')
    async getAll(@Param('filterType') filter: FilterType) { }

    @Get('answers/:cpId')
    async getCPByanswers(@Param('cpId') communityPostId: string) { }

    @Post('create')
    async create(@Body() body: CreateCPostDto) { }

    @Post('edit')
    async editCPost(@Body() body: EditCPostDto) { }

    @Post('reply/create')
    async createCReply(@Body() body: ReplyCPostDto) { }

    @Post('reply/edit')
    async editCReply(@Body() body: EditCReplyDto) { }
}
